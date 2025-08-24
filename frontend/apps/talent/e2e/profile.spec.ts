import { test, expect } from "@playwright/test";

test.describe("/profile", () => {
  test("正常系_入力_更新", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_profile@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_engineer_profile_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_engineer_profile_first_name");
    await page.getByRole("textbox", { name: "生年月日" }).fill("2000-12-31");
    await page.getByRole("textbox", { name: "居住地" }).fill("test_address");
    await page.getByRole("textbox", { name: "現在の雇用先" }).fill("test_current_employer");
    await page.getByRole("textbox", { name: "電話番号" }).fill("09012345678");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "姓" })).toHaveValue("test_engineer_profile_last_name");
    await expect(page.getByRole("textbox", { name: "名" })).toHaveValue("test_engineer_profile_first_name");
    await expect(page.getByRole("textbox", { name: "生年月日" })).toHaveValue("2000-12-31");
    await expect(page.getByRole("textbox", { name: "居住地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "現在の雇用先" })).toHaveValue("test_current_employer");
    await expect(page.getByRole("textbox", { name: "電話番号" })).toHaveValue("09012345678");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "姓" })).toHaveValue("test_engineer_profile_last_name");
    await expect(page.getByRole("textbox", { name: "名" })).toHaveValue("test_engineer_profile_first_name");
    await expect(page.getByRole("textbox", { name: "生年月日" })).toHaveValue("2000-12-31");
    await expect(page.getByRole("textbox", { name: "居住地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "現在の雇用先" })).toHaveValue("test_current_employer");
    await expect(page.getByRole("textbox", { name: "電話番号" })).toHaveValue("09012345678");
  });

  test("異常系", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_profile_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("");
    await page.getByRole("textbox", { name: "名" }).fill("test_engineer_profile_2_first_name");
    await page.getByRole("textbox", { name: "生年月日" }).fill("2000-12-31");
    await page.getByRole("textbox", { name: "居住地" }).fill("test_address");
    await page.getByRole("textbox", { name: "現在の雇用先" }).fill("test_current_employer");
    await page.getByRole("textbox", { name: "電話番号" }).fill("19012345678");

    await page.getByRole("button", { name: "更新する" }).click();

    await expect(page.getByText("姓を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("電話番号は0から始まる数字のみで入力してください。", { exact: true })).toBeVisible();

    await page.getByRole("textbox", { name: "姓" }).fill("test_engineer_profile_2_last_name");
    await page.getByRole("textbox", { name: "電話番号" }).fill("09012345678");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "姓" })).toHaveValue("test_engineer_profile_2_last_name");
    await expect(page.getByRole("textbox", { name: "名" })).toHaveValue("test_engineer_profile_2_first_name");
    await expect(page.getByRole("textbox", { name: "生年月日" })).toHaveValue("2000-12-31");
    await expect(page.getByRole("textbox", { name: "居住地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "現在の雇用先" })).toHaveValue("test_current_employer");
    await expect(page.getByRole("textbox", { name: "電話番号" })).toHaveValue("09012345678");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "姓" })).toHaveValue("test_engineer_profile_2_last_name");
    await expect(page.getByRole("textbox", { name: "名" })).toHaveValue("test_engineer_profile_2_first_name");
    await expect(page.getByRole("textbox", { name: "生年月日" })).toHaveValue("2000-12-31");
    await expect(page.getByRole("textbox", { name: "居住地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "現在の雇用先" })).toHaveValue("test_current_employer");
    await expect(page.getByRole("textbox", { name: "電話番号" })).toHaveValue("09012345678");
  });
});
