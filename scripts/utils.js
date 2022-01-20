export function getProperty(elem, propertyName) {
  return getComputedStyle(elem).getPropertyValue(propertyName);
}

export function incrementProperty(elem, propertyName, value) {
  elem.style.setProperty(
    propertyName,
    parseFloat(getProperty(elem, propertyName)) + value
  );
}

export function setProperty(elem, propertyName, value) {
  elem.style.setProperty(propertyName, value);
}

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function isCollide(rect1, rect2) {
  return (
    rect1.right >= rect2.left &&
    rect1.left <= rect2.right &&
    rect1.bottom >= rect2.top &&
    rect1.top <= rect2.bottom
  );
}
