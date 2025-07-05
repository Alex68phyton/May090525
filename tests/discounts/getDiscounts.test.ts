import { expect, request, test } from "@playwright/test";
import { Statuses } from "@libs/statuses";
import {  RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import { getBaseParameters } from "@entities/baseParameters";
import DiscountsRequests from "@requests/discounts.request";
import { getCurrentDate, getCurrentDatePlus7Days, getCurrentSplitDate, getCurrentSplitDatePlus7Days } from "@utils/getAnyDate";
import discountTestData from "@data/discount.json"


test.describe("API-тесты на получение акций", async () => {
    test.beforeAll( async ( {request} ) => {
        await test.step("Создать акцию", async () => {
             const requestBody = {
                session_id: requestTestData.sessionId,
                request_id: requestTestData.requestId,
                request_source: RequestSources.CRM,
                data: [
                    {
                     name: discountTestData.discountsName,
                     start_date: getCurrentDate(),
                     end_date: getCurrentDatePlus7Days(),
                     discount_rule_id: discountTestData.discountRule,
                     is_active: true,
                     available_clubs: [
                        {
                         id: discountTestData.availableClubsId
                        }
                    ],
                     available_payment_plans: [
                        {
                         id: discountTestData.availablePaymentPlansId
                        }
                    ],
                     available_interfaces: [
                        {
                         name: discountTestData.availableInterfacesName.crm
                        }
                    ],
                     is_deleted: false
                    }
                ]
            };
            await new DiscountsRequests(request).postDiscounts(Statuses.OK,requestBody);
        });
    });

    test("[positive] получение активных акций по названию за определенный период времени", async ({request}) => {
            const discountName = await test.step("получение активных акций по названию за определенный период времени", async () => {
                const parameters = await getBaseParameters();
                const discountSuccessResponse = await new DiscountsRequests(request).getDiscounts(Statuses.OK,{...parameters,...{start_date: getCurrentSplitDate(), end_date: getCurrentSplitDatePlus7Days(), name: discountTestData.discountsName}});
                return await discountSuccessResponse.json();
            });
            await test.step("Проверить название акции", async () => {
                expect(discountName.data[0].name).toEqual(discountTestData.discountsName);
            });
        });
});
