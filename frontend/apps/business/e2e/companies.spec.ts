import { test, expect } from "@playwright/test";
import * as path from "path";
import { fileURLToPath } from "url";

test.describe("/sign_up", () => {
  test("正常系_必須項目のみ", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_1");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_1@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("企業登録の入力内容")).toBeVisible();
    await expect(page.getByText("test_company_1", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_1@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("正常系_必須項目のみ_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_2");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 入力画面で編集
    await page.getByRole("button", { name: "入力へ戻る" }).click();
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_2_modified@example.com");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_2", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_2_modified@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("異常系_必須項目のみ", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: バリデーションエラーが表示されること
    await expect(page.getByText("企業名を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("パスワードは8文字以上で入力してください。", { exact: true })).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_3");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_3", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_3@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("異常系_必須項目のみ_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_4");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    await page.getByRole("button", { name: "入力へ戻る" }).click();

    // NOTE: 再入力内容が不適であれば、バリデーションエラーが表示されること
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");
    await page.getByRole("button", { name: "確認画面へ" }).click();
    await expect(page.getByText("パスワードは8文字以上で入力してください。", { exact: true })).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_4", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_4@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("正常系_任意項目含む", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_5");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_5@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    // NOTE: 確定申告書(コピー)のアップロード
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("確定申告書(コピー) ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const finalTaxReturnFileChooser = await fileChooserPromise;
    await finalTaxReturnFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_5", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_5@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("正常系_任意項目含む_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_6");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_6@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    // NOTE: 確定申告書(コピー)のアップロード
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("確定申告書(コピー) ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const finalTaxReturnFileChooser = await fileChooserPromise;
    await finalTaxReturnFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_6", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_6@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();

    // NOTE: 入力画面で編集
    await page.getByRole("button", { name: "入力へ戻る" }).click();
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();
    await page.getByText("削除").nth(0).click();
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_6", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_6@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("-")).toBeVisible();
    await expect(page.getByAltText("アップロード画像")).not.toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("異常系_任意項目含む", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_7");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_7@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");

    // NOTE: 確定申告書(コピー)のアップロード
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("確定申告書(コピー) ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const finalTaxReturnFileChooser = await fileChooserPromise;
    await finalTaxReturnFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();
    await expect(page.getByText("パスワードは8文字以上で入力してください。")).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_7", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_7@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });

  test("異常系_任意項目含む_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "企業名" }).fill("test_company_8");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_8@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    // NOTE: 確定申告書(コピー)のアップロード
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("確定申告書(コピー) ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const finalTaxReturnFileChooser = await fileChooserPromise;
    await finalTaxReturnFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();
    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_8", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_8@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();

    // NOTE: 入力画面に戻って異常系データを入力する
    await page.getByRole("button", { name: "入力へ戻る" }).click();
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");
    await page.getByRole("button", { name: "確認画面へ" }).click();
    await expect(page.getByText("パスワードは8文字以上で入力してください。")).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();
    await page.getByText("削除").nth(0).click();
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_company_8", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_8@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("-", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像")).not.toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("企業登録が完了しました。")).toBeVisible();
  });
});
