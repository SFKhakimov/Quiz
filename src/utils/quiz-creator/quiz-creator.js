function createQuestionFormElements(config, validity) {
  return {
    ...config,
    validity,
    valid: false,
    touched: false,
    value: "",
  };
}

function createAnswer(number) {
  return createQuestionFormElements(
    {
      label: `Ответ ${number}`,
      id: number,
      errorMessage: "Это обязательное поле",
    },
    { required: true }
  );
}

export function createFormQuesion() {
  return {
    question: createQuestionFormElements(
      {
        label: "Введите вопрос",
        errorMessage: "Это обязательное поле",
        id: Math.random(),
      },
      { required: true }
    ),
    answer1: createAnswer(1),
    answer2: createAnswer(2),
    answer3: createAnswer(3),
    answer4: createAnswer(4),
  };
}
