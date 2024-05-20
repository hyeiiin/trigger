/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#pragma once

#include "CoreMinimal.h"
#include "Engine/DataTable.h"
#include "RuleRangerAction.h"
#include "EnsureSkeletalMeshHasBones.generated.h"

/**
 * Action to check that the SkeletalMesh assets contain the specified bones.
 */
UCLASS(DisplayName = "Ensure Skeletal Mesh Has Bones")
class RULERANGER_API UEnsureSkeletalMeshHasBones final : public URuleRangerAction
{
    GENERATED_BODY()

    /** The names of the bones that must be present on the SkeletalMesh. */
    UPROPERTY(EditAnywhere)
    TSet<FName> Bones;
    /** The reason why we must have the bones. Used when emitting an error. */
    UPROPERTY(EditAnywhere)
    FString Reason{ "" };

public:
    virtual void Apply_Implementation(URuleRangerActionContext* ActionContext, UObject* Object) override;

    virtual UClass* GetExpectedType() override;
};