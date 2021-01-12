'use strict';

const Changeset = require('ep_etherpad-lite/static/js/Changeset');
const _ = require('ep_etherpad-lite/static/js/underscore');

const _analyzeLine = (alineAttrs, apool) => {
  let img = null;
  if (alineAttrs) {
    const opIter = Changeset.opIterator(alineAttrs);
    if (opIter.hasNext()) {
      const op = opIter.next();
      img = Changeset.opAttributeValue(op, 'img', apool);
    }
  }
  img = img.replace(/"/g, "'");
  return img;
};


exports.getLineHTMLForExport = async (hookName, context) => {
  const img = _analyzeLine(context.attribLine, context.apool);
  if (img) {
    if (context.text.indexOf('*') === 0) {
      context.lineContent = context.lineContent.replace('*', '');
    }

    context.lineContent = `${img} `;
    return context.lineContent;
  }
};

