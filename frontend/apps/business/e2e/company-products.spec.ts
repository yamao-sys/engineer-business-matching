import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

test.describe("/company-products", () => {
  test("正常系_一覧表示", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_product@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/company-products");

    // NOTE: プロダクト一覧が表示される
    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(3);
    await expect(page.getByText("削除する")).toHaveCount(3);

    await expect(page.getByAltText("test_company_product_1のロゴ")).toBeVisible();
    await expect(page.getByAltText("test_company_product_2のロゴ")).toBeVisible();
    await expect(page.getByAltText("test_company_product_3のロゴ")).toBeVisible();
  });

  test("正常系_新規追加", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_product_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/company-products");

    await expect(page.getByText("プロダクトが登録されていません。")).toBeVisible();
    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "プロダクト名" }).fill("test_company_product_2_name");
    await page.getByRole("textbox", { name: "説明" }).fill("test_company_product_2_description");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/2");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "登録する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロダクトを追加しました。");
      await dialog.accept();
    });

    // NOTE: プロダクト一覧が表示される
    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_product_2_nameのロゴ")).toBeVisible();
    await expect(page.getByText("test_company_product_2_name")).toBeVisible();
    // await expect(page.getByText("test_company_product_2_description")).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/2" })).toBeVisible();
  });

  test("正常系_新規追加して削除", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_product_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/company-products");

    await expect(page.getByText("プロダクトが登録されていません。")).toBeVisible();
    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "プロダクト名" }).fill("test_company_product_3_name");
    await page.getByRole("textbox", { name: "説明" }).fill("test_company_product_3_description");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/3");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 削除する
    await expect(page.getByText("削除する")).toHaveCount(1);
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("「test_company_product_3_name」を削除しますか？");
      await dialog.accept();
    });
    await page.getByText("削除する").click();

    await expect(page.getByText("プロダクトが登録されていません。")).toBeVisible();
    await expect(page.getByText("編集する")).not.toBeVisible();
    await expect(page.getByText("削除する")).not.toBeVisible();
  });

  test("正常系_既存のプロダクトありで新規追加", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_product_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/company-products");

    // NOTE: プロダクト一覧が表示される
    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);
    await expect(page.getByAltText("test_company_product_4のロゴ")).toBeVisible();

    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "プロダクト名" }).fill("test_company_product_5_name");
    await page.getByRole("textbox", { name: "説明" }).fill("test_company_product_5_description");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/5");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").nth(0).click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "登録する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロダクトを追加しました。");
      await dialog.accept();
    });

    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(2);
    await expect(page.getByText("削除する")).toHaveCount(2);

    // NOTE: 既存のプロダクトが表示される
    await expect(page.getByText("test_company_product_4", { exact: true })).toBeVisible();
    await expect(page.getByAltText("test_company_product_4のロゴ")).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/4" })).toBeVisible();
    // NOTE: 新規追加したプロダクトが表示される
    await expect(page.getByText("test_company_product_5_name")).toBeVisible();
    await expect(page.getByAltText("test_company_product_5_nameのロゴ")).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/5" })).toBeVisible();
  });

  test("正常系_既存のプロダクトありで編集", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_product_5@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/company-products");

    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_product_5のロゴ")).toBeVisible();
    await page.getByText("編集する").click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "プロダクト名" }).fill("test_company_product_5_name_edited");
    await page.getByRole("textbox", { name: "説明" }).fill("test_company_product_5_description_edited");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/5_edited");
    const svgIcon = page.locator('button:has-text("削除") >> svg.w-4.h-4.mr-1');
    await svgIcon.click();
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ロゴ ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const logoFileChooser = await fileChooserPromise;
    await logoFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "登録する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("プロダクトを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_product_5_name_editedのロゴ")).toBeVisible();
    await expect(page.getByText("test_company_product_5_name_edited")).toBeVisible();
    // await expect(page.getByText("test_company_product_5_description_edited")).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/5_edited" })).toBeVisible();
  });

  test("正常系_既存のプロダクトありで削除", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_product_6@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/company-products");

    await expect(page.getByText("プロダクトが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_product_6のロゴ")).toBeVisible();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("「test_company_product_6」を削除しますか？");
      await dialog.accept();
    });
    await page.getByText("削除する").click();

    await expect(page.getByText("プロダクトが登録されていません。")).toBeVisible();
    await expect(page.getByText("編集する")).not.toBeVisible();
    await expect(page.getByText("削除する")).not.toBeVisible();
  });
});
