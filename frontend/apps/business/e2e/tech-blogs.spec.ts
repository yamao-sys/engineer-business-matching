import { test, expect } from "@playwright/test";

test.describe("/tech-blogs", () => {
  test("正常系_一覧表示", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_tech_blog@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: 技術ブログ画面に遷移する
    await page.goto("/tech-blogs");

    // NOTE: 技術ブログ一覧が表示される
    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(3);
    await expect(page.getByText("削除する")).toHaveCount(3);

    await expect(page.getByText("test_company_tech_blog_1_title", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_tech_blog_2_title", { exact: true })).toBeVisible();
    await expect(page.getByText("test_company_tech_blog_3_title", { exact: true })).toBeVisible();
  });

  test("正常系_新規追加", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_tech_blog_2@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: 技術ブログ画面に遷移する
    await page.goto("/tech-blogs");

    await expect(page.getByText("技術ブログが登録されていません。")).toBeVisible();
    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "タイトル" }).fill("test_company_tech_blog_2_title");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/2");
    await page.getByRole("textbox", { name: "公開日" }).fill("2025-01-01");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("技術ブログを追加しました。");
      await dialog.accept();
    });

    // NOTE: 技術ブログ一覧が表示される
    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByText("test_company_tech_blog_2_title")).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/2" })).toBeVisible();
    await expect(page.getByText("2025-01-01")).toBeVisible();
  });

  test("正常系_新規追加して削除", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_tech_blog_3@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: 技術ブログ画面に遷移する
    await page.goto("/tech-blogs");

    await expect(page.getByText("技術ブログが登録されていません。")).toBeVisible();
    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "タイトル" }).fill("test_company_tech_blog_3_title");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/3");
    await page.getByRole("textbox", { name: "公開日" }).fill("2025-01-01");
    await page.getByRole("button", { name: "更新する" }).click();

    // NOTE: 削除する
    await expect(page.getByText("削除する")).toHaveCount(1);
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("「test_company_tech_blog_3_title」を削除しますか？");
      await dialog.accept();
    });
    await page.getByText("削除する").click();

    await expect(page.getByText("技術ブログが登録されていません。")).toBeVisible();
    await expect(page.getByText("編集する")).not.toBeVisible();
    await expect(page.getByText("削除する")).not.toBeVisible();
  });

  test("正常系_既存のプロダクトありで新規追加", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_tech_blog_4@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: プロダクト画面に遷移する
    await page.goto("/tech-blogs");

    // NOTE: 技術ブログ一覧が表示される
    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);
    await expect(page.getByText("test_company_tech_blog_4_title", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/4" })).toBeVisible();
    await expect(page.getByText("2024-12-31")).toBeVisible();

    await page.getByRole("button", { name: "追加する" }).click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "タイトル" }).fill("test_company_tech_blog_5_title");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/5");
    await page.getByRole("textbox", { name: "公開日" }).fill("2025-01-01");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("技術ブログを追加しました。");
      await dialog.accept();
    });

    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(2);
    await expect(page.getByText("削除する")).toHaveCount(2);

    // NOTE: 既存の技術ブログが表示される
    await expect(page.getByText("test_company_tech_blog_4_title", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/4" })).toBeVisible();
    await expect(page.getByText("2024-12-31")).toBeVisible();

    // NOTE: 新規追加した技術ブログが表示される
    await expect(page.getByText("test_company_tech_blog_5_title", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/5" })).toBeVisible();
    await expect(page.getByText("2025-01-01")).toBeVisible();
  });

  test("正常系_既存の技術ブログありで編集", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_tech_blog_5@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: 技術ブログ画面に遷移する
    await page.goto("/tech-blogs");

    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);
    await expect(page.getByText("test_company_tech_blog_5_title", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/5" })).toBeVisible();
    await expect(page.getByText("2024-12-31")).toBeVisible();

    await expect(page.getByText("test_company_tech_blog_5_title", { exact: true })).toBeVisible();
    await page.getByText("編集する").click();

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "タイトル" }).fill("test_company_tech_blog_5_title_edited");
    await page.getByRole("textbox", { name: "URL" }).fill("http://example.com/5_edited");
    await page.getByRole("textbox", { name: "公開日" }).fill("2025-01-01");
    await page.getByRole("button", { name: "更新する" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("技術ブログを更新しました。");
      await dialog.accept();
    });

    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByText("test_company_tech_blog_5_title_edited", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/5_edited" })).toBeVisible();
    await expect(page.getByText("2025-01-01")).toBeVisible();

    // NOTE: 一部のみ変更した場合はその分だけが更新されることの確認
    await page.getByText("編集する").click();
    await page.getByRole("textbox", { name: "公開日" }).fill("2025-01-02");
    await page.getByRole("button", { name: "更新する" }).click();
    await expect(page.getByText("test_company_tech_blog_5_title_edited", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "http://example.com/5_edited" })).toBeVisible();
    await expect(page.getByText("2025-01-02")).toBeVisible();
  });

  test("正常系_既存の技術ブログありで削除", async ({ page }) => {
    await page.goto("/sign_in");

    // NOTE: フォームを入力
    await page.getByRole("textbox", { name: "メールアドレス" }).fill("test_company_tech_blog_6@example.com");
    await page.getByRole("textbox", { name: "パスワード" }).fill("password");

    await page.getByRole("button", { name: "ログインする" }).click();

    // NOTE: ログインに成功すると、HOME画面に遷移する
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");

    // NOTE: 技術ブログ画面に遷移する
    await page.goto("/tech-blogs");

    await expect(page.getByText("技術ブログが登録されていません。")).not.toBeVisible();
    await expect(page.getByText("編集する")).toHaveCount(1);
    await expect(page.getByText("削除する")).toHaveCount(1);

    await expect(page.getByText("test_company_tech_blog_6_title", { exact: true })).toBeVisible();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("「test_company_tech_blog_6_title」を削除しますか？");
      await dialog.accept();
    });
    await page.getByText("削除する").click();

    await expect(page.getByText("技術ブログが登録されていません。")).toBeVisible();
    await expect(page.getByText("編集する")).not.toBeVisible();
    await expect(page.getByText("削除する")).not.toBeVisible();
  });
});
