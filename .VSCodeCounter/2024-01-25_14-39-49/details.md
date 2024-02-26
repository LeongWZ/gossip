# Details

Date : 2024-01-25 14:39:49

Directory /home/leong/Desktop/Projects/gossip

Total : 130 files,  11284 codes, 404 comments, 686 blanks, all 12374 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.dockerignore](/.dockerignore) | Ignore | 8 | 0 | 0 | 8 |
| [.eslintrc.js](/.eslintrc.js) | JavaScript | 70 | 0 | 0 | 70 |
| [.prettierrc.js](/.prettierrc.js) | JavaScript | 7 | 0 | 1 | 8 |
| [Dockerfile](/Dockerfile) | Docker | 12 | 1 | 6 | 19 |
| [README.md](/README.md) | Markdown | 35 | 0 | 22 | 57 |
| [app/assets/config/manifest.js](/app/assets/config/manifest.js) | JavaScript | 0 | 2 | 1 | 3 |
| [app/assets/stylesheets/application.css](/app/assets/stylesheets/application.css) | CSS | 0 | 15 | 1 | 16 |
| [app/controllers/api/v1/auth_controller.rb](/app/controllers/api/v1/auth_controller.rb) | Ruby | 18 | 0 | 5 | 23 |
| [app/controllers/api/v1/categories_controller.rb](/app/controllers/api/v1/categories_controller.rb) | Ruby | 36 | 0 | 12 | 48 |
| [app/controllers/api/v1/comments_controller.rb](/app/controllers/api/v1/comments_controller.rb) | Ruby | 62 | 0 | 18 | 80 |
| [app/controllers/api/v1/posts_controller.rb](/app/controllers/api/v1/posts_controller.rb) | Ruby | 66 | 0 | 19 | 85 |
| [app/controllers/api/v1/replies_controller.rb](/app/controllers/api/v1/replies_controller.rb) | Ruby | 55 | 0 | 17 | 72 |
| [app/controllers/api/v1/users_controller.rb](/app/controllers/api/v1/users_controller.rb) | Ruby | 24 | 0 | 7 | 31 |
| [app/controllers/application_controller.rb](/app/controllers/application_controller.rb) | Ruby | 30 | 2 | 8 | 40 |
| [app/controllers/homepage_controller.rb](/app/controllers/homepage_controller.rb) | Ruby | 5 | 0 | 2 | 7 |
| [app/frontend/components/App.tsx](/app/frontend/components/App.tsx) | TypeScript JSX | 171 | 14 | 19 | 204 |
| [app/frontend/components/Banner.tsx](/app/frontend/components/Banner.tsx) | TypeScript JSX | 55 | 0 | 3 | 58 |
| [app/frontend/components/Error.tsx](/app/frontend/components/Error.tsx) | TypeScript JSX | 23 | 0 | 3 | 26 |
| [app/frontend/components/Header.tsx](/app/frontend/components/Header.tsx) | TypeScript JSX | 147 | 3 | 15 | 165 |
| [app/frontend/components/Main.tsx](/app/frontend/components/Main.tsx) | TypeScript JSX | 72 | 1 | 10 | 83 |
| [app/frontend/components/ScrollTop.tsx](/app/frontend/components/ScrollTop.tsx) | TypeScript JSX | 33 | 0 | 8 | 41 |
| [app/frontend/components/Thread.tsx](/app/frontend/components/Thread.tsx) | TypeScript JSX | 128 | 7 | 24 | 159 |
| [app/frontend/components/auth/AuthComponent.tsx](/app/frontend/components/auth/AuthComponent.tsx) | TypeScript JSX | 12 | 0 | 5 | 17 |
| [app/frontend/components/auth/LogIn.tsx](/app/frontend/components/auth/LogIn.tsx) | TypeScript JSX | 107 | 0 | 13 | 120 |
| [app/frontend/components/auth/SignUp.tsx](/app/frontend/components/auth/SignUp.tsx) | TypeScript JSX | 108 | 0 | 13 | 121 |
| [app/frontend/components/comment/CommentContent.tsx](/app/frontend/components/comment/CommentContent.tsx) | TypeScript JSX | 196 | 3 | 29 | 228 |
| [app/frontend/components/comment/CreateComment.tsx](/app/frontend/components/comment/CreateComment.tsx) | TypeScript JSX | 70 | 0 | 10 | 80 |
| [app/frontend/components/comment/EditComment.tsx](/app/frontend/components/comment/EditComment.tsx) | TypeScript JSX | 62 | 0 | 10 | 72 |
| [app/frontend/components/dialogs/DeleteDialog.tsx](/app/frontend/components/dialogs/DeleteDialog.tsx) | TypeScript JSX | 49 | 0 | 5 | 54 |
| [app/frontend/components/dialogs/LogInSignUpDialog.tsx](/app/frontend/components/dialogs/LogInSignUpDialog.tsx) | TypeScript JSX | 55 | 0 | 6 | 61 |
| [app/frontend/components/dialogs/LogOutDialog.tsx](/app/frontend/components/dialogs/LogOutDialog.tsx) | TypeScript JSX | 56 | 0 | 6 | 62 |
| [app/frontend/components/forms/CommentForm.tsx](/app/frontend/components/forms/CommentForm.tsx) | TypeScript JSX | 67 | 0 | 12 | 79 |
| [app/frontend/components/forms/PostForm.tsx](/app/frontend/components/forms/PostForm.tsx) | TypeScript JSX | 81 | 0 | 8 | 89 |
| [app/frontend/components/post/CreatePost.tsx](/app/frontend/components/post/CreatePost.tsx) | TypeScript JSX | 69 | 0 | 10 | 79 |
| [app/frontend/components/post/EditPost.tsx](/app/frontend/components/post/EditPost.tsx) | TypeScript JSX | 73 | 0 | 8 | 81 |
| [app/frontend/components/post/PostContent.tsx](/app/frontend/components/post/PostContent.tsx) | TypeScript JSX | 119 | 2 | 14 | 135 |
| [app/frontend/components/post/PostPreview.tsx](/app/frontend/components/post/PostPreview.tsx) | TypeScript JSX | 52 | 0 | 5 | 57 |
| [app/frontend/components/reply/CreateReply.tsx](/app/frontend/components/reply/CreateReply.tsx) | TypeScript JSX | 61 | 0 | 8 | 69 |
| [app/frontend/components/reply/EditReply.tsx](/app/frontend/components/reply/EditReply.tsx) | TypeScript JSX | 62 | 1 | 9 | 72 |
| [app/frontend/components/reply/ReplyContent.tsx](/app/frontend/components/reply/ReplyContent.tsx) | TypeScript JSX | 134 | 2 | 21 | 157 |
| [app/frontend/components/toolbars/CategoryBar.tsx](/app/frontend/components/toolbars/CategoryBar.tsx) | TypeScript JSX | 43 | 0 | 6 | 49 |
| [app/frontend/components/toolbars/SearchBar.tsx](/app/frontend/components/toolbars/SearchBar.tsx) | TypeScript JSX | 139 | 1 | 11 | 151 |
| [app/frontend/components/types.d.ts](/app/frontend/components/types.d.ts) | TypeScript | 48 | 0 | 5 | 53 |
| [app/frontend/entrypoints/index.tsx](/app/frontend/entrypoints/index.tsx) | TypeScript JSX | 8 | 0 | 2 | 10 |
| [app/frontend/helpers/time_ago.ts](/app/frontend/helpers/time_ago.ts) | TypeScript | 27 | 0 | 8 | 35 |
| [app/frontend/hooks/useCookieState.ts](/app/frontend/hooks/useCookieState.ts) | TypeScript | 18 | 1 | 6 | 25 |
| [app/frontend/hooks/useStorageState.ts](/app/frontend/hooks/useStorageState.ts) | TypeScript | 24 | 1 | 8 | 33 |
| [app/frontend/styles/App.module.css](/app/frontend/styles/App.module.css) | CSS | 13 | 4 | 2 | 19 |
| [app/helpers/api/v1/auth_helper.rb](/app/helpers/api/v1/auth_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/api/v1/categories_helper.rb](/app/helpers/api/v1/categories_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/api/v1/comments_helper.rb](/app/helpers/api/v1/comments_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/api/v1/posts_helper.rb](/app/helpers/api/v1/posts_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/api/v1/replies_helper.rb](/app/helpers/api/v1/replies_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/api/v1/users_helper.rb](/app/helpers/api/v1/users_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/application_helper.rb](/app/helpers/application_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/helpers/homepage_helper.rb](/app/helpers/homepage_helper.rb) | Ruby | 2 | 0 | 1 | 3 |
| [app/models/application_record.rb](/app/models/application_record.rb) | Ruby | 3 | 0 | 1 | 4 |
| [app/models/category.rb](/app/models/category.rb) | Ruby | 3 | 0 | 1 | 4 |
| [app/models/comment.rb](/app/models/comment.rb) | Ruby | 5 | 0 | 1 | 6 |
| [app/models/post.rb](/app/models/post.rb) | Ruby | 6 | 0 | 1 | 7 |
| [app/models/reply.rb](/app/models/reply.rb) | Ruby | 5 | 0 | 1 | 6 |
| [app/models/user.rb](/app/models/user.rb) | Ruby | 6 | 0 | 2 | 8 |
| [app/views/api/v1/categories/index.html.erb](/app/views/api/v1/categories/index.html.erb) | erb | 2 | 0 | 1 | 3 |
| [app/views/api/v1/comments/index.html.erb](/app/views/api/v1/comments/index.html.erb) | erb | 2 | 0 | 1 | 3 |
| [app/views/api/v1/posts/index.html.erb](/app/views/api/v1/posts/index.html.erb) | erb | 2 | 0 | 1 | 3 |
| [app/views/api/v1/replies/index.html.erb](/app/views/api/v1/replies/index.html.erb) | erb | 2 | 0 | 1 | 3 |
| [app/views/homepage/index.html.erb](/app/views/homepage/index.html.erb) | erb | 1 | 0 | 0 | 1 |
| [app/views/layouts/application.html.erb](/app/views/layouts/application.html.erb) | erb | 23 | 0 | 6 | 29 |
| [config.ru](/config.ru) | Ruby | 3 | 1 | 3 | 7 |
| [config/application.rb](/config/application.rb) | Ruby | 14 | 18 | 6 | 38 |
| [config/boot.rb](/config/boot.rb) | Ruby | 2 | 0 | 2 | 4 |
| [config/database.yml](/config/database.yml) | YAML | 18 | 59 | 10 | 87 |
| [config/environment.rb](/config/environment.rb) | Ruby | 2 | 2 | 2 | 6 |
| [config/environments/development.rb](/config/environments/development.rb) | Ruby | 24 | 21 | 18 | 63 |
| [config/environments/production.rb](/config/environments/production.rb) | Ruby | 20 | 35 | 21 | 76 |
| [config/environments/test.rb](/config/environments/test.rb) | Ruby | 17 | 20 | 14 | 51 |
| [config/initializers/assets.rb](/config/initializers/assets.rb) | Ruby | 1 | 8 | 4 | 13 |
| [config/initializers/content_security_policy.rb](/config/initializers/content_security_policy.rb) | Ruby | 0 | 29 | 6 | 35 |
| [config/initializers/cors.rb](/config/initializers/cors.rb) | Ruby | 8 | 0 | 2 | 10 |
| [config/initializers/filter_parameter_logging.rb](/config/initializers/filter_parameter_logging.rb) | Ruby | 3 | 4 | 2 | 9 |
| [config/initializers/inflections.rb](/config/initializers/inflections.rb) | Ruby | 0 | 14 | 3 | 17 |
| [config/initializers/permissions_policy.rb](/config/initializers/permissions_policy.rb) | Ruby | 0 | 11 | 1 | 12 |
| [config/locales/en.yml](/config/locales/en.yml) | YAML | 2 | 30 | 2 | 34 |
| [config/puma.rb](/config/puma.rb) | Ruby | 8 | 28 | 8 | 44 |
| [config/routes.rb](/config/routes.rb) | Ruby | 21 | 3 | 9 | 33 |
| [config/vite.json](/config/vite.json) | JSON | 17 | 0 | 1 | 18 |
| [db/migrate/20231223043724_create_comments.rb](/db/migrate/20231223043724_create_comments.rb) | Ruby | 9 | 0 | 2 | 11 |
| [db/migrate/20231223140317_create_posts.rb](/db/migrate/20231223140317_create_posts.rb) | Ruby | 9 | 0 | 2 | 11 |
| [db/migrate/20231228052241_link_comments_to_post.rb](/db/migrate/20231228052241_link_comments_to_post.rb) | Ruby | 8 | 0 | 2 | 10 |
| [db/migrate/20231231165658_add_comments_count.rb](/db/migrate/20231231165658_add_comments_count.rb) | Ruby | 5 | 0 | 1 | 6 |
| [db/migrate/20240101104014_create_users.rb](/db/migrate/20240101104014_create_users.rb) | Ruby | 10 | 0 | 2 | 12 |
| [db/migrate/20240103172552_set_username_limit.rb](/db/migrate/20240103172552_set_username_limit.rb) | Ruby | 6 | 0 | 1 | 7 |
| [db/migrate/20240104045753_remove_user_password_and_bio.rb](/db/migrate/20240104045753_remove_user_password_and_bio.rb) | Ruby | 6 | 0 | 1 | 7 |
| [db/migrate/20240104064037_add_username_to_post_and_comment.rb](/db/migrate/20240104064037_add_username_to_post_and_comment.rb) | Ruby | 6 | 0 | 1 | 7 |
| [db/migrate/20240110132614_create_categories.rb](/db/migrate/20240110132614_create_categories.rb) | Ruby | 9 | 0 | 2 | 11 |
| [db/migrate/20240110133050_link_posts_to_category.rb](/db/migrate/20240110133050_link_posts_to_category.rb) | Ruby | 7 | 0 | 1 | 8 |
| [db/migrate/20240112092009_create_replies.rb](/db/migrate/20240112092009_create_replies.rb) | Ruby | 10 | 0 | 3 | 13 |
| [db/migrate/20240112173602_add_replies_count.rb](/db/migrate/20240112173602_add_replies_count.rb) | Ruby | 5 | 0 | 1 | 6 |
| [db/migrate/20240113024722_link_replies_to_post_though_comment.rb](/db/migrate/20240113024722_link_replies_to_post_though_comment.rb) | Ruby | 8 | 0 | 2 | 10 |
| [db/migrate/20240118170803_link_posts_to_user.rb](/db/migrate/20240118170803_link_posts_to_user.rb) | Ruby | 9 | 0 | 3 | 12 |
| [db/migrate/20240118171000_link_comments_to_user.rb](/db/migrate/20240118171000_link_comments_to_user.rb) | Ruby | 9 | 0 | 3 | 12 |
| [db/migrate/20240118180250_link_replies_to_user.rb](/db/migrate/20240118180250_link_replies_to_user.rb) | Ruby | 9 | 0 | 3 | 12 |
| [db/migrate/20240121085253_add_default_posts_count_to_category.rb](/db/migrate/20240121085253_add_default_posts_count_to_category.rb) | Ruby | 5 | 0 | 1 | 6 |
| [db/schema.rb](/db/schema.rb) | Ruby | 50 | 12 | 8 | 70 |
| [db/seeds.rb](/db/seeds.rb) | Ruby | 6 | 7 | 2 | 15 |
| [docker-compose.yml](/docker-compose.yml) | YAML | 38 | 0 | 1 | 39 |
| [docker-rails.sh](/docker-rails.sh) | Shell Script | 2 | 1 | 2 | 5 |
| [docker-vite.sh](/docker-vite.sh) | Shell Script | 2 | 1 | 2 | 5 |
| [package-lock.json](/package-lock.json) | JSON | 7,717 | 0 | 1 | 7,718 |
| [package.json](/package.json) | JSON | 31 | 0 | 1 | 32 |
| [public/404.html](/public/404.html) | HTML | 61 | 1 | 6 | 68 |
| [public/422.html](/public/422.html) | HTML | 61 | 1 | 6 | 68 |
| [public/500.html](/public/500.html) | HTML | 60 | 1 | 6 | 67 |
| [test/controllers/api/v1/auth_controller_test.rb](/test/controllers/api/v1/auth_controller_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/controllers/api/v1/categories_controller_test.rb](/test/controllers/api/v1/categories_controller_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/controllers/api/v1/comments_controller_test.rb](/test/controllers/api/v1/comments_controller_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/controllers/api/v1/posts_controller_test.rb](/test/controllers/api/v1/posts_controller_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/controllers/api/v1/replies_controller_test.rb](/test/controllers/api/v1/replies_controller_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/controllers/api/v1/users_controller_test.rb](/test/controllers/api/v1/users_controller_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/controllers/homepage_controller_test.rb](/test/controllers/homepage_controller_test.rb) | Ruby | 7 | 0 | 2 | 9 |
| [test/fixtures/categories.yml](/test/fixtures/categories.yml) | YAML | 6 | 1 | 3 | 10 |
| [test/fixtures/comments.yml](/test/fixtures/comments.yml) | YAML | 6 | 1 | 3 | 10 |
| [test/fixtures/posts.yml](/test/fixtures/posts.yml) | YAML | 6 | 1 | 3 | 10 |
| [test/fixtures/replies.yml](/test/fixtures/replies.yml) | YAML | 6 | 1 | 3 | 10 |
| [test/models/category_test.rb](/test/models/category_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/models/comment_test.rb](/test/models/comment_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/models/post_test.rb](/test/models/post_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/models/reply_test.rb](/test/models/reply_test.rb) | Ruby | 3 | 3 | 2 | 8 |
| [test/test_helper.rb](/test/test_helper.rb) | Ruby | 7 | 3 | 4 | 14 |
| [vite.config.ts](/vite.config.ts) | TypeScript | 12 | 0 | 2 | 14 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)