
build:
	npm run build

clean:
	rm -rf build

deploy:
	netlify deploy --dir=build -p
