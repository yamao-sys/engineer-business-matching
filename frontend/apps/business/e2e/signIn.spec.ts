import { test, expect } from "@playwright/test";

test.describe("/sign_in", () => {
  test("正常系", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_sign_in@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("ログインしました。");
      await dialog.accept();
    });
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");
  });

  test("異常系", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_sign_in@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: バリデーションエラーが表示されること
    await expect(page.getByText("メールアドレスまたはパスワードに該当するユーザが見つかりません。")).toBeVisible();

    // 入力し直してログインできること
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログイン成功
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("ログインしました。");
      await dialog.accept();
    });
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");
  });
});
