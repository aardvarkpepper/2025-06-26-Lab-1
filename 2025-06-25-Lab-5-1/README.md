![Me Using Object-Oriented Programming](./9yhcpc.jpg)

## Reflection Questions

1.  How did you dynamically create and append new elements to the DOM?

When updating cart, wiped cart ul by setting textContent = "", then created fragment, used a loop to iterate through cart to get data, created li item for each loop iteration and added data, appended li to fragment, after loop end appended fragment to ul.

2.  What steps did you take to ensure accurate updates to the total price?

I didn't use parseFloat or dataset.  Though those were in the prewritten code and dataset usage was covered in the reading, the assignment didn't require their use.  I wanted to standardize item prices so used classes and constructors.  If a single item really did have different prices due to discounts, regional differences, or such, that could be handled by a Vendor class.

The prewritten code used a global variable to keep a running track of a total; this could be added to or subtracted each time changes to the cart were made (item addition or deletion). I think I could have written some slightly hard to track code to do something similar in the ShoppingCart class, but I just iterated through the array aggregating product multiplied by quantity.

3.  How did you handle invalid input for product name or price?

Product name entry of empty string, price entry of negative value, and product name entry of product name already in database but with different price each added to an error string sent to user with alert, using a return to stop the process of adding the item to the data structure.

4.  What challenges did you face when implementing the remove functionality?

The item removed didn't just have to be removed from the HTML list, it had to be removed from the data array in Javascript too.  With possible multiple li elements, each li needed a signifier to pass back what item was being removed.

I ended up setting attribute on name of the li element, which was based on user input so potentially could lead to some sort of HTML injection attack.  I also ran into some small issues after restructuring the data making old references not work. Could have set ID based on static variable in ShoppingCart class, but I seem to remember I wasn't supposed to use that for some reason - possibly that's just an issue when assigning array indices as unique IDs when most of the database isn't entirely rewritten when an item is added or removed.

There were a lot of ways to address the issue, though all using variations on passing information from an HTML element to identify a specific item in the Javascript data array.  Used set attribute as I hadn't done it before.

## Resources

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
