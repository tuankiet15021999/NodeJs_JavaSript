const btn = document.querySelector('button')
const clickMe = ()=>{
    console.log(`get Api`,new Date().getTime());
}
// throttle

const throttle = (fn,delay)=>{
    delay = delay || 0
    let lastTime = 0
    return () =>{
        const now = new Date().getTime()
        if(now - lastTime < delay){
            return;
        }
        lastTime = now
        fn()
    }
}

// debounce
const debounce = (fn,delay)=>{
    delay = delay || 0
    let timerId
    console.log(`timerId immediate load:::`,timerId);
    return ()=>{
        console.log(`timerId previous at ${timerId}`);
        if(timerId){
            clearTimeout(timerId)
            timerId == null
        }
        timerId = setTimeout(()=>{
            fn()
        },delay)
    }
}
btn.addEventListener('click',throttle(clickMe,2000))
