import { test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import GroupTrainingCategoriesRequests from "@requests/groupTrainingCategories.requests"



test.describe("API-тесты на получение категорий тренировок", async () => {
    test("[positive] получение всех категорий тренировок", async ({request}) => {
        await test.step("Получить информацию о категориях тренировок", async () => { 
                const parameters = {...await getBaseParameters()};
                await new GroupTrainingCategoriesRequests(request).getGroupTrainingCategories(200, parameters);
        })
            
    });
         
});