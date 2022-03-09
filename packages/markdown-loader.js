const marked = require('marked');
const Prism = require('prismjs');

const fs = require('fs');
const path = require('path');

// 注册vue语言支持
Prism.languages.vue = Prism.languages.extend('html', {
    punctuation: /({{|}})/gi,
});

// 自定义render
class CustomRender extends marked.Renderer {
    heading(text, level, raw, slugger) {
        let html = super.heading(text, level, raw, slugger);
        if (level <= 2) {
            html = html.replace(
                '<h' + level,
                '<h' + level + ' class="headerlink"'
            );
        }
        return html;
    }

    link(href, title, text) {
        const html = super.link(href, title, text);

        if (/^(http|https):\/\//.test(href)) {
            return html.replace(/^<a/, '<a target="_blank" rel="noopener"');
        } else {
            return html;
        }
    }

    code(code, language, isEscaped) {
        const NeedLoadCode = /^(\[import\]:\s)/;

        if (NeedLoadCode.test(code)) {
            const codePath = code.replace(NeedLoadCode, '').trim();
            try {
                code = fs.readFileSync(
                    path.resolve(__dirname, '..', codePath),
                    {
                        encoding: 'utf-8',
                    }
                );
            } catch (error) {
                // todo: 文件加载失败
            }
        }
        return super.code(code, language, isEscaped);
    }
}

function markdownLoader(val) {
    const html = marked(val, {
        renderer: new CustomRender(),
        highlight(code, lang) {
            return Prism.highlight(
                code,
                Prism.languages[lang] || Prism.languages.markup
            );
        },
    });
    return `<template><div class="markdown-page">${html}</div></template>`;
}

module.exports = markdownLoader;
