.PHONY: css watch

# 前提: Dart Sass (sass) をインストール済み
# macOS(Homebrew): brew install sass/sass/sass

css:
	sass --style=expanded scss/style.scss css/style.css

watch:
	sass --watch scss/style.scss:css/style.css --style=expanded --poll


