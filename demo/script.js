document.addEventListener('DOMContentLoaded',()=>{
    const startquizbtn = document.getElementById('start-btn')
    const restartquiz = document.getElementById('restart-btn')
    const resultcontainer = document.getElementById('result-container')
    const finalscore = document.getElementById('score')
    const questioncont = document.getElementById('question-container')
    const question = document.getElementById('question-text')
    const choices = document.getElementById('choices-list')
    const nextbtn = document.getElementById('next-btn')

    let totalscore = 0
    const allquestions = [
        {q : "What is the capital of Australia?", ans : "Canberra", choices: ["Sydney","Melbourne","Canberra","Brisbane"]},
        {q : "What planet is known as the Red Planet?", ans : "Mars" , choices: ["Venus","Jupiter","Mars","Saturn"]},
        {q : "Who was the first President of the United States?", ans : "George Washington" , choices: ["Abraham Lincoln"," Thomas Jefferson"," George Washington"," John Adams"]},
        {q : "Who wrote Romeo and Juliet?", ans : "William Shakespeare" , choices: ["William Shakespeare ","Charles Dickens","Jane Austen","Mark Twain"]},
        {q : "What does HTML stand for?", ans : "Hyper Text Markup Language" , choices: ["Hyperlinks and Text Markup Language","Home Tool Markup Language","Hyper Text Markup Language","High-Level Text Machine Language"]}
    ]
    
    startquizbtn.addEventListener('click',()=>{
        questioncont.classList.remove('hidden')
        nextbtn.classList.remove('hidden')
        startquizbtn.classList.add('hidden')
        displayquestion()
    })

    let currentQuestion = null;
    let answered = false;
    let questionindex = 0

    function displayquestion(){
        if (allquestions.length === questionindex){
            question.textContent = "Quiz Completed!"
            choices.innerHTML = ""
            nextbtn.classList.add('hidden')
            finalscore.textContent = `${totalscore}`
            resultcontainer.classList.remove('hidden')
            return
        }

        answered = false;
        currentQuestion = allquestions[questionindex]
        question.textContent = currentQuestion.q
        choices.innerHTML = ""

        currentQuestion.choices.forEach(choice => {
            const li = document.createElement('li')
            li.textContent = choice
            li.addEventListener('click', () => {
                if (!answered) {
                    if (choice.trim() === currentQuestion.ans.trim()) {
                        totalscore += 1;
                    }
                    answered = true;
                }
            })
            choices.appendChild(li)
        })
    }

    nextbtn.addEventListener('click', () => {
        if (!answered) {
            alert("Please select an answer before moving on.")
            return
        }
        questionindex+=1
        displayquestion()
    })

    restartquiz.addEventListener('click',() =>{
        questionindex = 0
        totalscore = 0;
        resultcontainer.classList.add("hidden");
        questioncont.classList.add('hidden')
        nextbtn.classList.add('hidden')
        startquizbtn.classList.remove('hidden')
    })

})