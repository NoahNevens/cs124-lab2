<h1> Our Major Design Decisions </h1>

<h3>Lab 1 Design</h3>

<p>At first it seemed like the best and most obvious alignment would be to center all the items. We originally wanted the heading and all the tasks to be centered.
View our original centered template below:</p>

<img src="/design/CenteredItems.jpeg" alt="Centered Items To-Do List" style="height: 400px; width: 300px;" />

<p>But after Prof Millburn's lecture, we decided that a left-align would look more natural. She mentioned that a user's eyes go immediately to the top left corner of any page, 
so that's where the heaviest part of our to-do list lives. However, we then felt as though the page was a little *too* top heavy so we wanted to make the "Show Uncompleted" and "Delete All Completed" buttons at the bottom page a little bigger so that our page felt more full. </p>

<p> Figuring out how we wanted to the checkboxes to look was difficult. Even though the task sounds simple, getting the satisfying square-like box with the green check icon wasn't so easy. We were thinking of also adding "x"-shaped icons next to each of the tasks. Hopefully as user could easily identify the icons as a signifier for deleting individual tasks. The concurrent version of our to-do list looked like the image below:</p>

<img src="/design/Version2.jpeg" alt="The new checkboxes" style="height: 400px; width: 300px;" />

<p> We did a little bit of user testing. Daniela's mom was our most reliable user. We sent her many drafts and she responded with her thoughts almost immediately every time. Next lab we will probably rely on more friends for user testing. We think this will make it easier to decide on design problems that the two of us might disagree on. For instance, she helped us a little with the color scheme of the title and whether or not we should have text effects (e.g. shadows and glows). View an example of a product from this user testing below:</p>

<img src="/design/Version3.jpeg" alt="User Testing Color Schemes" style="height: 400px; width: 300px;" />

<p> We're proud of the icon and how satisfying the hover function looks on the bottom buttons. The right icon was a little bit difficult to find and once we found it and made it fit with the rest of the page, we were pretty excited. And for a while, something felt wrong about the buttons because they were a similar hue to the rest of the page but just felt weird. Then we inverted the background button color and the button font color and made it so that when you hover over a button the colors invert again to a very nice dark blue background and a white text. We think the bottom buttons look quite nice.</p>



<hr>
<h3>Lab 2 Design</h3>

<p> Our design from Lab 1 supported two ways to add a new task: 
<ol> 
<li> Enter text in the field to the right of the add button, then click on the button to add the task. </li>
<li> First add a blank task, then alter the text. </li>
</ol>
This design is pictured below.
</p>

<img src="/design/Version4.png" alt="Dual Add UI" style="height: 400px; width: 300px;" />
</br>

<p>However, grutor Marcos Acosta pointed out that dual add options made for a confusing UI. He suggested that we remove the text box to the right of the add button and only implement the second method, where the user must first create a new task, then change the placeholder text. This new design is shown below, and we agree that it is much clearer. </p>

| <img src="/design/add-ex1.png" alt="New add task interface, before add" style="height: 400px" /> | <img src="/design/add-ex2.png" alt="New add task interface, after add" style="height: 400px" /> |
| --- | --- |
| <p> Before the add button is clicked </p> | <p> After the add button is clicked </p> |

</br>

Other important decisions involved the "Show Only Uncomplete" button. After implementing its toggle functionality (one click hides all completed items; another click brings them back), we realized that users would have no way of knowing whether "Show Only Uncomplete" was on or not. To erase this confusion, we decided to make the button blue when it is toggled. 

Marcos also noted that it makes more sense for the "Show Only Uncomplete" button to say "Show All" when it is toggled. In other words, if only the uncomplete tasks are showing, it makes no sense that you would re-click "Show Only Uncomplete" to re-display the completed items. Instead, when only the uncomplete items are showing, the button now says "Show All," indicating that you have the option to re-display all of the tasks. 


| <img src="/design/toggle-ex2.png" alt="Before Show Only Uncomplete toggle, before add" style="height: 400px" />  | <img src="/design/toggle-ex1.png" alt="After Show Only Uncomplete toggle, before add" style="height: 400px" /> |
| --- | --- |
| <p> Before Show Only Uncomplete is toggled </p> | <p> After Show Only Uncomplete is toggled </p> |


We asked another user (and awful friend), Anshul Kamath, to give feedback on our app. He noticed that it was possible to have several empty tasks at once and that this was kind of strange. After adding a new task, you should type something in that box before adding a new task. We made it so that if there is a blank new task, you cannot add another new task before text is added to the original new task. Furthermore, if your cursor is focused on a task and then you click off the task and the box is empty, then the task is deleted. The app assumes that if you backspace an entire task or add a task but don't type anything in it, then you want to delete it.

We also had a user tell us that it would be useful if there was some feedback for when you type in a text box. So we made the text box darker when you start typing in it. 

<hr>
<h3>Lab 3 Design</h3>

<p> One of the biggest issues with our lab 2 app was that the tasks would run off the screen and become unreachable. For now, we decided that implementing a limit on the number of tasks would be interesting.
When the user tries to add more than 10 tasks, a message appears at the bottom of the screen and disappears after 2.5 seconds. Now that we have a database that can be shared by people, we don't want the app to 
become cluttered with too many tasks. As a general life rule, if you have more than 10 tasks to complete, you should finish some of them before making new ones.
</p>

<p>Additionally, we previously had bottom buttons that read "Show Only Uncomplete" and "Clear All Completed." We found that by decreasing that text to "Hide Completed"
and "Clear Completed", it was easier to read and didn't have to wrap as much at smaller screen sizes. In the name of being even more practical, we made it so that the bottom
buttons do not appear if no tasks are completed, since we noticed that there is no reason to have the bottom buttons otherwise.</p>

<p>We had multiple users tell us that adding a due date would be a good idea because their favorite to-do list applications apparently include due date features. We found this to be 
a good suggestion. </p>

<img src="/design/duedate.png" alt="Due date design features a date next to a small calendar icon" style="height: 300px"/>

<hr>
<h3>Lab 4 Design</h3>

Our main concern with the due-date feature was how to accommodate the long dates on a narrower screen. We decided to save space by truncating the year. Daniela's mom also suggested that we abbreviate "high", "med", and "low" to just their first letters; the consistent color-coding would help users understand what these letters stand for.

| <img src="/design/wide screen.png" alt="Wide screen shows normal date and 'med' priority" style="height: 200px" />  | <img src="/design/narrow screen.png" alt="Due date truncated and 'med' becomes 'M' on a narrow screen" style="height: 240px" /> |
| --- | --- |
| <p> Date and priority on a wide screen </p> | <p> Date and priority display on a narrow screen </p> |

Next, we had to undergo a slight checkbox design change, as we had initially implemented our checkboxes using labels instead of actual checkboxes, but continuing to use labels would force us to implement all of the ARIA checkbox-specific functionality that is built-in to actual checkboxes. To help users who cannot use a mouse navigate our app using only the keyboard, we added shading for focused objects, like checkboxes. Thus our checkboxes now look like this:

| <img src="/design/new check 1.png" alt="The new checkbox design features a green check on a white box" style="height: 150px" />  | <img src="/design/new check 2.png" alt="Gray shading on the second checkbox indicates focus" style="height: 150px" /> | <img src="/design/old check.png" alt="The old checkbox design features a green background and thinner white check" style="height: 150px" /> |
| --- | --- | --- |
| <p> The new checkbox design </p> | <p> The new focus indicator </p> | <p> The old checkbox design</p> |

A final major change was the new loading screen. Before, "Loading..." just flashed on a white background. Now, you can see a navy blue arc rotate around a white circle, with a pretty blue background. 

<img src="/design/loading screen.png" alt="The loading screen features a navy arc rotating around a white circle, with a light blue background" style="height: 500px"/>

<hr>

<h3> Navigation videos! </h3>

[Keyboard only navigation](https://youtu.be/-PtDJdx3iHE)
