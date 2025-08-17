import { test, expect } from "@playwright/test";
import * as path from "path";
import { fileURLToPath } from "url";

test.describe("/sign_up", () => {
  test("正常系_必須項目のみ", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_1@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("エンジニア登録の入力内容")).toBeVisible();
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_1@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("1990-01-01", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("正常系_必須項目のみ_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 入力画面で編集
    await page.getByRole("button", { name: "入力へ戻る" }).click();
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name_modified");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name_modified");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_2_modified@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password_modified");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1991-01-01");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name_modified test_first_name_modified", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_2_modified@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("*****************", { exact: true })).toBeVisible();
    await expect(page.getByText("1991-01-01", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("異常系_必須項目のみ", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: バリデーションエラーが表示されること
    await expect(page.getByText("姓を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("名を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("パスワードは8文字以上で入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("生年月日を入力してください。", { exact: true })).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_3@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("1990-01-01", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("異常系_必須項目のみ_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");

    await page.getByRole("button", { name: "確認画面へ" }).click();

    await page.getByRole("button", { name: "入力へ戻る" }).click();

    // NOTE: 再入力内容が不適であれば、バリデーションエラーが表示されること
    await page.getByRole("textbox", { name: "姓" }).fill("");
    await page.getByRole("textbox", { name: "名" }).fill("");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("");
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");
    await page.getByRole("textbox", { name: "生年月日" }).fill("");
    await page.getByRole("button", { name: "確認画面へ" }).click();
    await expect(page.getByText("姓を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("名を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("パスワードは8文字以上で入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("生年月日を入力してください。", { exact: true })).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_4@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("1990-01-01", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("正常系_任意項目含む", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_5@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");
    // NOTE: 本人確認書類(表面)のアップロード
    const frontIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(0).click();
    const frontIdentificationFileChooser = await frontIdentificationFileChooserPromise;
    await frontIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    // NOTE: 本人確認書類(裏面)のアップロード
    const backIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(1).click();
    const backIdentificationFileChooser = await backIdentificationFileChooserPromise;
    await backIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_5@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(1)).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("正常系_任意項目含む_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_6@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");

    // NOTE: 本人確認書類(表面)のアップロード
    const frontIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(0).click();
    const frontIdentificationFileChooser = await frontIdentificationFileChooserPromise;
    await frontIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    // NOTE: 本人確認書類(裏面)のアップロード
    const backIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(1).click();
    const backIdentificationFileChooser = await backIdentificationFileChooserPromise;
    await backIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_6@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(1)).toBeVisible();

    // NOTE: 入力画面で編集
    await page.getByRole("button", { name: "入力へ戻る" }).click();
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(1)).toBeVisible();
    await page.getByText("削除").nth(0).click();
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_6@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("-", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像")).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("異常系_任意項目含む", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");

    // NOTE: 本人確認書類(表面)のアップロード
    const frontIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(0).click();
    const frontIdentificationFileChooser = await frontIdentificationFileChooserPromise;
    await frontIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    // NOTE: 本人確認書類(裏面)のアップロード
    const backIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(1).click();
    const backIdentificationFileChooser = await backIdentificationFileChooserPromise;
    await backIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();
    await expect(page.getByText("姓を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("名を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("パスワードは8文字以上で入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("生年月日を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(1)).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_7@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_7@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(1)).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });

  test("異常系_任意項目含む_入力に戻って修正", async ({ page }) => {
    await page.goto("/sign_up");

    // NOTE: 会員登録フォームを入力
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_8@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");

    // NOTE: 本人確認書類(表面)のアップロード
    const frontIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(0).click();
    const frontIdentificationFileChooser = await frontIdentificationFileChooserPromise;
    await frontIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    // NOTE: 本人確認書類(裏面)のアップロード
    const backIdentificationFileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("ファイルをドラッグ&ドロップ、またはクリックして選択").nth(1).click();
    const backIdentificationFileChooser = await backIdentificationFileChooserPromise;
    await backIdentificationFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));

    await page.getByRole("button", { name: "確認画面へ" }).click();
    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_8@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像").nth(0)).toBeVisible();

    // NOTE: 入力画面に戻って異常系データを入力する
    await page.getByRole("button", { name: "入力へ戻る" }).click();
    await page.getByRole("textbox", { name: "姓" }).fill("");
    await page.getByRole("textbox", { name: "名" }).fill("");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("");
    await page.getByRole("textbox", { name: "パスワード" }).fill("passwor");
    await page.getByRole("textbox", { name: "生年月日" }).fill("");
    await page.getByRole("button", { name: "確認画面へ" }).click();
    await expect(page.getByText("姓を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("名を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("パスワードは8文字以上で入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("生年月日を入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(1)).toBeVisible();

    // 入力し直して確認 → 登録できること
    await page.getByRole("textbox", { name: "姓" }).fill("test_last_name");
    await page.getByRole("textbox", { name: "名" }).fill("test_first_name");
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_engineer_8@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");
    await page.getByRole("textbox", { name: "生年月日" }).fill("1990-01-01");
    await expect(page.getByAltText("プレビュー").nth(0)).toBeVisible();
    await expect(page.getByAltText("プレビュー").nth(1)).toBeVisible();
    await page.getByText("削除").nth(0).click();
    await page.getByRole("button", { name: "確認画面へ" }).click();

    // NOTE: 確認画面で入力内容を表示できること
    await expect(page.getByText("test_last_name test_first_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_engineer_8@example.com", { exact: true })).toBeVisible();
    await expect(page.getByText("********", { exact: true })).toBeVisible();
    await expect(page.getByText("-", { exact: true })).toBeVisible();
    await expect(page.getByAltText("アップロード画像")).toBeVisible();

    await page.getByRole("button", { name: "登録する" }).click();

    // NOTE: 登録に成功すると、サンクス画面に遷移する
    await expect(page.getByText("エンジニア登録が完了しました。")).toBeVisible();
  });
});
