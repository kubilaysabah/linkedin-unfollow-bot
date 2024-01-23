(() => {
    // This function collects all the buttons on the page that match the criteria for "Unfollow" buttons.
    // It uses a CSS selector to find all buttons that have specific attributes indicating they're associated with the "Unfollow" action.
    function getAllButtons() {
        // 'document.querySelectorAll' returns all elements on the page that match the provided selector.
        // The selector is looking for buttons that indicate an "Unfollow" action.
        return document.querySelectorAll('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view');
    }

    // This asynchronous function goes through each "Unfollow" button and clicks it, adding a slight delay between each action.
    async function unfollowAll() {
        // Getting all the buttons using the above-defined function.
        const buttons = getAllButtons();

        // 'for...of' loop to iterate over all the buttons fetched.
        for (let button of buttons) {
            const confirmButton = document.querySelector('button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.artdeco-modal__confirm-dialog-btn');

            if(confirmButton) {
                confirmButton.click();
            }

            // Simulating a click on the button to unfollow.
            button.click();

            // After clicking the button, we wait for 100 milliseconds. This delay is used to prevent the server from thinking
            // that the clicks are coming from a bot (which could happen if all actions are done instantly) and to allow
            // processing time for each unfollow action.
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    // This function initiates the unfollow process and ensures it continues scrolling and unfollowing until no more buttons are found.
    async function run() {
        // Calling the function to unfollow all currently available profiles.
        await unfollowAll();

        // Scrolling to the bottom of the page to potentially load more buttons. Some websites use "lazy loading,"
        // where content (including more "Unfollow" buttons) isn't loaded until the user scrolls down.
        window.scrollTo(0, document.body.scrollHeight);

        // Waiting for one second to give the page time to potentially load more buttons after scrolling.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // After waiting, fetch the buttons again to see if new ones have appeared.
        const buttons = getAllButtons();

        // If there are more buttons, the 'run' function is called again, repeating the process. This recursion continues
        // until there are no more buttons left to click, at which point the process stops.
        if (buttons.length) run();
    }

    // Initial call to the 'run' function to start the process.
    run();
})(); 