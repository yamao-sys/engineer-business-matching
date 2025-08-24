import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

test.describe("/profile", () => {
  test("正常系_入力_更新", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_profile@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "会社名" }).fill("test_company_profile");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("textbox", { name: "所在地" }).fill("test_address");
    await page.getByRole("textbox", { name: "サイトURL" }).fill("test@example.com/test_site");
    await page.getByRole("textbox", { name: "従業員数" }).fill("100");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");
  });

  test("正常系_入力_更新_ロゴ削除(リロードなし)", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_profile_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "会社名" }).fill("test_company_profile_2_edited");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("textbox", { name: "所在地" }).fill("test_address");
    await page.getByRole("textbox", { name: "サイトURL" }).fill("test@example.com/test_site");
    await page.getByRole("textbox", { name: "従業員数" }).fill("100");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_2_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    // NOTE: ロゴを削除する
    await page.getByText("削除").click();
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByAltText("プレビュー")).not.toBeVisible();

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_2_edited");
    await expect(page.getByAltText("プレビュー")).not.toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");
  });

  test("正常系_入力_更新_ロゴ削除(リロードあり)", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_profile_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "会社名" }).fill("test_company_profile_3_edited");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("textbox", { name: "所在地" }).fill("test_address");
    await page.getByRole("textbox", { name: "サイトURL" }).fill("test@example.com/test_site");
    await page.getByRole("textbox", { name: "従業員数" }).fill("100");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_3_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_3_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    // NOTE: ロゴを削除する
    await page.getByText("削除").click();
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByAltText("プレビュー")).not.toBeVisible();

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_3_edited");
    await expect(page.getByAltText("プレビュー")).not.toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");
  });

  test("正常系_入力_更新_ロゴ変更", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_profile_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "会社名" }).fill("test_company_profile_4_edited");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("textbox", { name: "所在地" }).fill("test_address");
    await page.getByRole("textbox", { name: "サイトURL" }).fill("test@example.com/test_site");
    await page.getByRole("textbox", { name: "従業員数" }).fill("100");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_4_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    // NOTE: ロゴを削除する
    await page.getByText("削除").click();
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByAltText("プレビュー")).not.toBeVisible();

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_4_edited");
    await expect(page.getByAltText("プレビュー")).not.toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    const otherFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const otherLogoFileChooser = await otherFileChooserPromise;
    await otherLogoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "更新する" }).click();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });
    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");
    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_4_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");
  });

  test("異常系", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_profile_5@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/profile");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "会社名" }).fill("");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("textbox", { name: "所在地" }).fill("test_address");
    await page.getByRole("textbox", { name: "サイトURL" }).fill("test@example.com/test_site");
    await page.getByRole("textbox", { name: "従業員数" }).fill("100");

    await page.getByRole("button", { name: "更新する" }).click();

    await expect(page.getByText("企業名を入力してください。", { exact: true })).toBeVisible();

    await page.getByRole("textbox", { name: "会社名" }).fill("test_company_profile_5_edited");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロフィールを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_5_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/profile");

    await expect(page.getByRole("textbox", { name: "会社名" })).toHaveValue("test_company_profile_5_edited");
    await expect(page.getByAltText("プレビュー")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "所在地" })).toHaveValue("test_address");
    await expect(page.getByRole("textbox", { name: "サイトURL" })).toHaveValue("test@example.com/test_site");
    await expect(page.getByRole("textbox", { name: "従業員数" })).toHaveValue("100");
  });
});
