import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

test.describe("/company-members", () => {
  test("正常系_一覧表示", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_member@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: メンバー画面に遷移する
    await page.goto("/company-members");

    // NOTE: メンバー一覧が表示される
    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(3);
    await expect(page.getByText("削除する")).toHaveCount(3);

    await expect(page.getByAltText("test_company_member_1_nameのアイコン")).toBeVisible();
    await expect(page.getByAltText("test_company_member_2_nameのアイコン")).toBeVisible();
    await expect(page.getByAltText("test_company_member_3_nameのアイコン")).toBeVisible();
  });

  test("正常系_新規追加", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_member_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: メンバー画面に遷移する
    await page.goto("/company-members");

    await expect(page.getByText("メンバーが登録されていません。")).toBeVisible();
    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "表示名" }).fill("test_company_member_2_name");
    await page.getByRole("textbox", { name: "ポジション" }).fill("test_company_member_2_position");
    await page.getByRole("textbox", { name: "概要" }).fill("test_company_member_2_description");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("アイコン ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const iconFileChooser = await fileChooserPromise;
    await iconFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("メンバーを追加しました。");
      await dialog.accept();
    });

    // NOTE: メンバー一覧が表示される
    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_member_2_nameのアイコン")).toBeVisible();
    await expect(page.getByText("test_company_member_2_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_2_position", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_2_description", { exact: true })).toBeVisible();
  });

  test("正常系_新規追加して削除", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_member_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: メンバー画面に遷移する
    await page.goto("/company-members");

    await expect(page.getByText("メンバーが登録されていません。")).toBeVisible();
    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "表示名" }).fill("test_company_member_3_name");
    await page.getByRole("textbox", { name: "ポジション" }).fill("test_company_member_3_position");
    await page.getByRole("textbox", { name: "概要" }).fill("test_company_member_3_description");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("アイコン ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const iconFileChooser = await fileChooserPromise;
    await iconFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "更新する" }).click();

    // NOTE: 削除する
    await expect(page.getByText("削除する")).toHaveCount(1);
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("「test_company_member_3_name」を削除しますか？");
      await dialog.accept();
    });
    await page.getByText("削除する").click();

    await expect(page.getByText("メンバーが登録されていません。")).toBeVisible();
    await expect(page.getByText("編集する")).not.toBeVisible();
    await expect(page.getByText("削除する")).not.toBeVisible();
  });

  test("正常系_既存のメンバーありで新規追加", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_member_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: メンバー画面に遷移する
    await page.goto("/company-members");

    // NOTE: メンバー一覧が表示される
    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);
    await expect(page.getByText("test_company_member_4_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_4_position", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_4_description", { exact: true })).toBeVisible();
    await expect(page.getByAltText("test_company_member_4_nameのアイコン")).toBeVisible();

    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "表示名" }).fill("test_company_member_5_name");
    await page.getByRole("textbox", { name: "ポジション" }).fill("test_company_member_5_position");
    await page.getByRole("textbox", { name: "概要" }).fill("test_company_member_5_description");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("アイコン ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const iconFileChooser = await fileChooserPromise;
    await iconFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("メンバーを追加しました。");
      await dialog.accept();
    });

    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(2);
    await expect(page.getByText("削除する")).toHaveCount(2);

    // NOTE: 既存のメンバーが表示される
    await expect(page.getByText("test_company_member_4_name", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_4_position", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_4_description", { exact: true })).toBeVisible();
    await expect(page.getByAltText("test_company_member_4_nameのアイコン")).toBeVisible();
    // NOTE: 新規追加したメンバーが表示される
    await expect(page.getByText("test_company_member_5_name")).toBeVisible();
    await expect(page.getByText("test_company_member_5_position", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_5_description", { exact: true })).toBeVisible();
    await expect(page.getByAltText("test_company_member_5_nameのアイコン")).toBeVisible();
  });

  test("正常系_既存のメンバーありで編集", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_member_5@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: メンバー画面に遷移する
    await page.goto("/company-members");

    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_member_5_nameのアイコン")).toBeVisible();
    await page.getByText("編集する").click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "表示名" }).fill("test_company_member_5_name_edited");
    await page.getByRole("textbox", { name: "ポジション" }).fill("test_company_member_5_position_edited");
    await page.getByRole("textbox", { name: "概要" }).fill("test_company_member_5_description_edited");
    const svgIcon = page.locator('button:has-text("削除") >> svg.w-4.h-4.mr-1');
    await svgIcon.click();
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("アイコン ファイルをドラッグ&ドロップ、またはクリックして選択").click();
    const iconFileChooser = await fileChooserPromise;
    await iconFileChooser.setFiles(path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/test.jpg"));
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("メンバーを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_member_5_name_editedのアイコン")).toBeVisible();
    await expect(page.getByText("test_company_member_5_name_edited")).toBeVisible();
    await expect(page.getByText("test_company_member_5_position_edited", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_member_5_description_edited", { exact: true })).toBeVisible();
  });

  test("正常系_既存のメンバーありで削除", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_member_6@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: メンバー画面に遷移する
    await page.goto("/company-members");

    await expect(page.getByText("メンバーが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByAltText("test_company_member_6_nameのアイコン")).toBeVisible();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("「test_company_member_6_name」を削除しますか？");
      await dialog.accept();
    });
    await page.getByText("削除する").click();

    await expect(page.getByText("メンバーが登録されていません。")).toBeVisible();
    await expect(page.getByText("編集する")).not.toBeVisible();
    await expect(page.getByText("削除する")).not.toBeVisible();
  });
});
