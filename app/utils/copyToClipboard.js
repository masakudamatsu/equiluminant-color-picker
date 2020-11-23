// For this function to work, the element to click should set its id attribute to be textToCopy

const copyToClipboard = async textToCopy => {
  // For browsers supporting Clipboard API
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log(
        `Text "${textToCopy}" is copied onto the user's clipboard with Clipboard API.`,
      );
    } catch (err) {
      console.error(`Clipboard API fails to copy.`, err);
    } // Follow the code example in https://web.dev/async-clipboard/#writetext()
    return;
  }

  // For legacy browsers
  if (document.queryCommandSupported('copy')) {
    // Select the button label text
    const range = document.createRange();
    const button = document.getElementById(textToCopy);
    range.selectNode(button);
    window.getSelection().addRange(range);

    // Copy the selected text
    const copyResult = document.execCommand('copy');
    if (copyResult === 'successful') {
      console.log(
        `Text "${textToCopy}" is copied onto the user's clipboard with execCommand('copy').`,
      );
    } else {
      console.log(`execCommand('copy') fails to copy.`);
    }

    // Clear selection
    window.getSelection().removeAllRanges();

    return;
  }

  console.log(
    `unable to copy due to the lack of support for Clipboard API or execCommand('copy').`,
  );
};

export default copyToClipboard;
