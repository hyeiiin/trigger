import React from 'react';
import styled from 'styled-components';
import ValorantButton from './Valorant';


const handlePlayClick = () => {
  console.log("Play button clicked!");
  // 플레이 버튼 클릭 시 수행할 작업
};

// Section 컴포넌트에 스타일을 적용합니다.
const Section = styled.section`
  height: 90vh;
  background-image: url('/valorant5.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 섹션의 하단에 내용을 정렬합니다.
  align-items: center;       // 내용을 가로축 중앙에 정렬합니다.
  color: white;
  padding-bottom: 20px;      // 하단 패딩을 추가하여 버튼이 바닥에 닿지 않게 합니다.
  `;


export const MainSection3: React.FC = () => {
  return (
    <Section>
      <ValorantButton label="지금 시청하기" onClick={handlePlayClick} />
    </Section>
  );
}
