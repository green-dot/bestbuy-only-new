let target = document.querySelectorAll('[class^=productsRow_]')[0]

const illegalProductPhrases = [
  'refurbished',
  'open box',
  'refurb',
  'recertified'
]

const observer = new MutationObserver(function(mutations){
  // Get the individual product containers on the page
  const itemClass = 'x-productListItem';
  let products = document.body.getElementsByClassName(itemClass);
  
  for(let item of products){
    
    let title = item.querySelector('[itemprop=name]').innerHTML;
    let lowerCaseTitle = title.toLowerCase();
    
    let hasIllegalPhase = illegalProductPhrases.reduce((acc, phrase) => {
        return acc || lowerCaseTitle.indexOf(phrase) > -1
      }, false)

    if (hasIllegalPhase){
      item.parentElement.removeChild(item);
      console.log('Deleted Item')
    } 
  }
});

const config = {attributes: true, childList: true, characterData: true, subtree: true };

observer.observe(target, config)

