import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";
import axios from "axios";
import { getFCMs } from "./fcm";

const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/notice";

export type Notice = {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeImg: string; 
  noticeEmergency: number;
  noticeViewCnt: number;
  noticeCreatedAt: string;
};

export type Notices = [];

function b64toBlob(b64Data: string, contentType: string, sliceSize = 512): Blob {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

async function postNotification(notice: Notice): Promise<void> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  const formData = new FormData();
  formData.append('noticeTitle', notice.noticeTitle);
  formData.append('noticeContent', notice.noticeContent);

  if (notice.noticeImg) {
    // Assuming noticeImg is a base64 string of the image, we need to convert it to a File/Blob object
    const blob = b64toBlob(notice.noticeImg.split(',')[1], notice.noticeImg.split(',')[0].split(':')[1].split(';')[0]);
    formData.append('noticeImg', new File([blob], "filename.png"));
  }

  const token: string | null = localStorage.getItem('token');
  local.defaults.headers.Authorization = "Bearer " + token;

  try {
    await local.post(`${url}/register`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // This might be redundant as axios sets it automatically for JSON payloads
      }
    });


    const fcmTokens = await getFCMs();
    console.log(fcmTokens)
    const fcmUrl = "https://fcm.googleapis.com/fcm/send";
    const fcmHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAaTWX5Gs:APA91bHzgQp6joaC4Kv2aTDyX-baS5DmmVvj4StsgV7FYIYLMhaCMXeCImEF6hUJDfEUbvTar9zVt2sw3xTbN70i6rL0IwtrrxJSLXo-aYA5NKuJyhU0EpUyD45mP_LktxYECLBxHw4X'
    };

    const notificationPayload = JSON.stringify({
      registration_ids: fcmTokens,
      notification: {
        title: notice.noticeTitle,
        body: notice.noticeContent
      }
    });

    console.log("Sending notification with payload:", notificationPayload);
    await axios.post(fcmUrl, notificationPayload, { headers: fcmHeaders })
      .then(response => console.log("Notification sent successfully:", response))
      .catch(error => console.error("Failed to send notification:", error));

  } catch (error) {
    console.error("Error posting notification:", error);
    throw new Error("Error occurred while posting the notification.");
  }
}

async function getNotificationList(): Promise<Notices[]> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  try {
    const response = await local.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw new Error("Error occurred while getting the notifications.");
  }
}

async function getNotificationDetail(noticeId: number): Promise<Notice> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  try {
    const response = await local.get(`${url}/detail?noticeId=${noticeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting notification detail for ID: ${noticeId}`, error);
    throw new Error(`Error occurred while getting the notification with ID: ${noticeId}`);
  }
}

export { postNotification, getNotificationList, getNotificationDetail };
