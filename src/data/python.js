const python = [
  {
    "id": 1,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "[[1, 2, 3], [1, 2, 3]]", "Error: Unsupported operand type"],
    "correct": "[1, 2, 3, 1, 2, 3]",
    "hints": "x = [1, 2, 3]\nprint(x * 2)"
  },
  {
    "id": 2,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["hello", "o", "olleh", "h"],
    "correct": "olleh",
    "hints": "x = \"hello\"\nprint(x[::-1])"
  },
  {
    "id": 3,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[1, 2, 3]", "[1, 2, 3, 4]", "None", "Error: Invalid syntax"],
    "correct": "[1, 2, 3]",
    "hints": "a = [1, 2, 3]\nb = a[:]\nb.append(4)\nprint(a)"
  },
  {
    "id": 4,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[1, 2, 3, 4]", "4", "None", "[1, 2, 3]"],
    "correct": "None",
    "hints": "x = [1, 2, 3]\ny = x.append(4)\nprint(y)"
  },
  {
    "id": 5,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[[1], [], []]", "[[1], [1], [1]]", "[[1], [0], [0]]", "[1, 1, 1]"],
    "correct": "[[1], [1], [1]]",
    "hints": "x = [[]] * 3\nx[0].append(1)\nprint(x)"
  },
  {
    "id": 6,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[1, 2, 3]", "[1, 2, 3, 4, 5]", "None", "[4, 5]"],
    "correct": "[1, 2, 3, 4, 5]",
    "hints": "a = [1, 2, 3]\nb = a\na += [4, 5]\nprint(b)"
  },
  {
    "id": 7,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[1, 2, 3, 4, 1, 2, 3, 4]", "[[1, 2, 3], [1, 2, 3]]", "[1, 2, 3, 1, 2, 3]", "Error: Star operator not allowed here"],
    "correct": "[1, 2, 3, 1, 2, 3]",
    "hints": "x = [1, 2, 3]\ny = [*x, *x]\nx.append(4)\nprint(y)"
  },
  {
    "id": 8,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["1", "2", "{'x': 1}", "None"],
    "correct": "1",
    "hints": "a = {'x': 1}\nb = a.copy()\na['x'] = 2\nprint(b['x'])"
  },
  {
    "id": 9,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["1", "-1", "3", "Error: Index out of range"],
    "correct": "3",
    "hints": "print([1, 2, 3][-1])"
  },
  {
    "id": 10,
    "level": "pythonLang",
    "type": "pythonLang",
    "question": "What is the output of this program?",
    "options": ["[3, 2, 1]", "[1, 2, 3]", "None", "3, 2, 1"],
    "correct": "None",
    "hints": "a = [1, 2, 3]\nb = a.reverse()\nprint(b)"
  }
]


export default python;