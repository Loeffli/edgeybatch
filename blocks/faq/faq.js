import { addAnchorLink } from '../../scripts/scripts.js';

function autoLink(string) {
  const pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?):\/\/[-A-Z0-9+\u0026\u2019@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|])/gi;
  return string.replace(pattern, '$1<a href="$2">$2</a>');
}

export default async function decorateFaq($block) {
  const source = new URL($block.querySelector('a').href).pathname;
  const resp = await fetch(source);
  const json = await resp.json();

  //erase the page
  $block.innerText = '';

  //parsing the JSON rows i.e. the resource records
  json.data.forEach((row, i) => {

    if (row.Status === "Approved") {

      //faq item
      const $item = document.createElement('div');
      $item.classList.add('faq-item');

      // topic
      const $topic = document.createElement('div');
      $topic.classList.add('faq-topic');
      $topic.innerHTML = row.Topic;

      // question-answer-wrapper
      const $qawrapper = document.createElement('div');
      $qawrapper.classList.add('faq-qawrapper');

      //question
      const $question = document.createElement('div');
      $question.classList.add('faq-question');
      $question.id = `q${(i + 1)}`;
      $question.innerText = row.Question;
      //CML addAnchorLink($dt);

      //answer
      const $answer = document.createElement('div');
      $answer.classList.add('faq-answer');
      $answer.innerText = row.Answer;
      

      $qawrapper.append($question, $answer);
      $item.append($topic, $qawrapper);
      $block.append($item);
    }
  });

  const selected = document.getElementById(window.location.hash.slice(1));
  if (selected) {
    selected.scrollIntoView();
  }
}
