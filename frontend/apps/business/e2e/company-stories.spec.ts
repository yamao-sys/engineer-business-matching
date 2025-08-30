import { test, expect } from "@playwright/test";

test.describe("/company-stories", () => {
  test("正常系_新規作成", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_story@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/company-stories");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "ミッション" }).fill("test_company_story_mission");
    await page.getByRole("textbox", { name: "ビジョン" }).fill("test_company_story_vision");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("企業ストーリーを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/company-stories");

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision");
  });

  test("正常系_更新", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_story_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/company-stories");

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_2");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_2");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "ミッション" }).fill("test_company_story_mission_2_edited");
    await page.getByRole("textbox", { name: "ビジョン" }).fill("test_company_story_vision_2_edited");

    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("企業ストーリーを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_2_edited");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_2_edited");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/company-stories");

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_2_edited");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_2_edited");
  });

  test("異常系_新規作成", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_story_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/company-stories");

    await page.getByRole("button", { name: "更新する" }).click();

    await expect(page.getByText("ミッションを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("ビジョンを入力してください。", { exact: true })).toBeVisible();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "ミッション" }).fill("test_company_story_mission_3");
    await page.getByRole("textbox", { name: "ビジョン" }).fill("test_company_story_vision_3");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("企業ストーリーを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_3");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_3");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/company-stories");

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_3");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_3");
  });

  test("異常系_更新", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_company_story_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロフィール画面に遷移する
    await page.goto("/company-stories");

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_4");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_4");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "ミッション" }).fill("");
    await page.getByRole("textbox", { name: "ビジョン" }).fill("");

    await page.getByRole("button", { name: "更新する" }).click();

    await expect(page.getByText("ミッションを入力してください。", { exact: true })).toBeVisible();
    await expect(page.getByText("ビジョンを入力してください。", { exact: true })).toBeVisible();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "ミッション" }).fill("test_company_story_mission_4_edited");
    await page.getByRole("textbox", { name: "ビジョン" }).fill("test_company_story_vision_4_edited");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("企業ストーリーを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_4_edited");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_4_edited");

    // NOTE: 再びページを訪れると、更新した内容が表示されること
    await page.goto("/company-stories");

    await expect(page.getByRole("textbox", { name: "ミッション" })).toHaveValue("test_company_story_mission_4_edited");
    await expect(page.getByRole("textbox", { name: "ビジョン" })).toHaveValue("test_company_story_vision_4_edited");
  });
});
