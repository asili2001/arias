## `debounce`

The `debounce` function creates a debounced version of the provided function, which delays its invocation until after a specified wait time has elapsed since the last time it was called. This is particularly useful for optimizing performance and controlling the rate at which a function executes, such as when handling user input events.

### Attributes

* **func**: The function to debounce. This is the function that will be delayed.
* **wait**: The number of milliseconds to delay the function invocation.

### Returns

* A debounced function. When this debounced function is called, it will delay the invocation of the original function (`func`) until after the specified wait time has passed since the last call.

Example

````type
const handleResize = () => {
    console.log('Window resized');
};

const debouncedResize = debounce(handleResize, 200);

window.addEventListener('resize', debouncedResize);
// The 'handleResize' function will be invoked only after 200 milliseconds have passed since the last resize event.
````

In this example, the `handleResize` function will only be executed 200 milliseconds after the last `resize` event, preventing it from being called too frequently during rapid window resizing.

## `throttle`

The `throttle` function creates a throttled version of the provided function, ensuring that it is only invoked at most once per specified wait time. This is useful for limiting the rate at which a function can be executed, which is especially beneficial for performance optimization in scenarios such as handling scroll or resize events.

### Attributes

* **func**: The function to throttle. This is the function that will be restricted to execute at most once per specified wait time.
* **wait**: The number of milliseconds to throttle invocations to. This defines the minimum time interval between consecutive function executions.

### Returns

* A throttled function. When this throttled function is called, it will only invoke the original function (`func`) if the specified wait time has passed since the last invocation.

### Example

````
const handleScroll = () => {
    console.log('Scrolled');
};

const throttledScroll = throttle(handleScroll, 200);

window.addEventListener('scroll', throttledScroll);
// The 'handleScroll' function will be invoked at most once every 200 milliseconds during scroll events.
````

In this example, the `handleScroll` function will be executed at most once every 200 milliseconds, regardless of how frequently the `scroll` event occurs.

## `sleep`

The `sleep` function introduces a delay by returning a promise that resolves after a specified number of milliseconds. This can be useful for creating pauses in asynchronous code execution.

### Attributes

* **ms**: The number of milliseconds to delay. This specifies the duration for which the function will pause execution.

### Returns

* A promise that resolves after the specified delay. This allows the function to be used with `await` in asynchronous functions to introduce a delay.

### Example

````typescript
const performTask = async () => {
    console.log('Task started');
    await sleep(2000); // Delay for 2 seconds
    console.log('Task finished after 2 seconds');
};

performTask();
// Output:
// Task started
// (After 2 seconds)
// Task finished after 2 seconds
````

In this example, the `performTask` function demonstrates how the `sleep` function can be used to introduce a 2-second delay between log statements.
