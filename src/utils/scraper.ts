import { chromium, Browser, Page } from "playwright";
import { CBA_CONSTANTS, CBA_DOM_CONSTANTS } from "../constants";

const main = async (address: string) => {
    const browser: Browser = await chromium.launch({
        headless: process.env.NODE_ENV === "production" ? true : false,
    });

    const page: Page = await browser.newPage();

    await page.goto(CBA_CONSTANTS.CBA_HOME_BUYING_SEARCH_URL);

    await page
        .getByPlaceholder(CBA_DOM_CONSTANTS.ADDRESS_INPUT_PLACEHOLDER)
        .fill(address);

    await page.waitForLoadState("domcontentloaded");

    // get the first option in the suggestions
    await page.getByRole("option").nth(0).click();

    // get the valuation div
    const valuation = await (
        await page.waitForSelector(".estimated-value")
    ).textContent();
    console.log(`Valuation for the given address = ${valuation}`);

    // TODO - remove timeout in prod
    await page.waitForTimeout(10000);

    await browser.close();
};

main("1 Vaughan Avenue, Revesby NSW 2212");
