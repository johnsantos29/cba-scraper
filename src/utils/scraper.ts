import { chromium, Browser, Page } from "playwright";
import { CBA_HOME_BUYING_SEARCH_URL } from "../constants";

const main = async () => {
    const browser: Browser = await chromium.launch({
        headless: process.env.NODE_ENV === "production" ? true : false,
    });

    const page: Page = await browser.newPage();

    await page.goto(CBA_HOME_BUYING_SEARCH_URL);

    // TODO - deal with constants like the below
    await page
        .getByPlaceholder("Enter suburb, postcode or address")
        .fill("12 Alabaster Place Eagle Vale");

    await page.waitForLoadState("domcontentloaded");

    // TODO - try catch here - if there are no suggestions
    await page.getByRole("option").nth(0).click();

    // TODO - remove timeout in prod
    await page.waitForTimeout(10000);

    await browser.close();
};

main();
