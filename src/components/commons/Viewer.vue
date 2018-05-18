<template lang="pug">
div.viewer(class="markdown-body" v-html="marked" :style="{width: width, height: height, flex: flex ? 'auto' : 'none'}")
</template>

<script>
import Markdown from "markdown-it";
import Highlight from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css/github-markdown.css";
import "../../vendor/katex/katex.min.css";

import Emoji from "markdown-it-emoji";
import Subscript from "markdown-it-sub";
import Superscript from "markdown-it-sup";
import Footnote from "markdown-it-footnote";
import Deflist from "markdown-it-deflist";
import Abbreviation from "markdown-it-abbr";
import Insert from "markdown-it-ins";
import Mark from "markdown-it-mark";
import Katex from "markdown-it-katex";
import TaskLists from "markdown-it-task-lists";

export default {
  props: {
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    },
    flex: {
      type: Boolean,
      default: true
    },
    raw: {
      type: String,
      default: ""
    }
  },
  created() {
    const markdown = new Markdown({
      html: false,
      xhtmlOut: false,
      breaks: false,
      langPrefix: "language-",
      linkify: false,
      typographer:  false,
      quotes: "“”‘’",
      highlight: function (text, lang) {
        if (lang && Highlight.getLanguage(lang)) {
          try {
            return Highlight.highlight(lang, text).value;
          } catch (e) {
            console.error(e);
            return text;
          }
        } else {
          try {
            return Highlight.highlightAuto(text).value;
          } catch (e) {
            console.error(e);
            return text;
          }
        }
      }
    });

    markdown.use(Emoji)
      .use(Subscript)
      .use(Superscript)
      .use(Footnote)
      .use(Deflist)
      .use(Abbreviation)
      .use(Insert)
      .use(Mark)
      .use(Katex, { "throwOnError": false, "errorColor": " #cc0000" })
      .use(TaskLists);

    this.markdown = markdown;
  },
  computed: {
    marked() {
      return this.markdown.render(this.raw);
    }
  }
}
</script>

<style lang="scss">
.viewer {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  overflow: auto;
  padding: 10px;
}
</style>