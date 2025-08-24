import { test } from "@playwright/test";
import { getBaseParameters } from "../../entities/baseParameters";
import ProductsRequests from "@requests/products.requests";



test.describe("API-тесты на получение продуктов", async () => {
    test("[positive] получение списка продуктов", async ({request}) => {
        const parameters = {...await getBaseParameters()};
        await new ProductsRequests(request).getProducts(200, parameters);
    });
    test("[positive] получение списка продуктов по категории", async ({request}) => {
        const parameters = {...await getBaseParameters(),...{category: "freeze"}};
        await new ProductsRequests(request).getProducts(200, parameters);
    });      
});