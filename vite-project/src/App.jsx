import { useState } from 'react';
import './App.css';
import User from './User';

const App = () => {
  const initialUsers = [
    {
      "name": "Алексей Иванов",
      "department": "Маркетинг",
      "position": "Менеджер по маркетингу"
    },
    {
      "name": "Ольга Петрова",
      "department": "Маркетинг",
      "position": "Аналитик по маркетингу"
    },
    {
      "name": "Ирина Сидорoва",
      "department": "Финансы",
      "position": "Финансовый аналитик"
    },
    {
      "name": "Максим Кузнецов",
      "department": "ИТ",
      "position": "Разработчик программного обеспечения"
    },
    {
      "name": "Наталья Смирнова",
      "department": "Человеческие ресурсы",
      "position": "HR-менеджер"
    },
    {
      "name": "Дмитрий Васильев",
      "department": "Финансы",
      "position": "Бухгалтер"
    },
    {
      "name": "Екатерина Михайлова",
      "department": "ИТ",
      "position": "Системный администратор"
    },
    {
      "name": "Андрей Попов",
      "department": "Маркетинг",
      "position": "Специалист по рекламе"
    },
    {
      "name": "Татьяна Ковалёва",
      "department": "Финансы",
      "position": "Кoнтролёр"
    },
    {
      "name": "Сергей Новиков",
      "department": "ИТ",
      "position": "Аналитик данных"
    },
    {
      "name": "Марина Федорова",
      "department": "Человеческие ресурсы",
      "position": "Рекрутер"
    },
    {
      "name": "Виктор Захаров",
      "department": "Маркетинг",
      "position": "Менеджер по контенту"
    },
    {
      "name": "Анна Баранова",
      "department": "ИТ",
      "position": "Разработчик мобильных приложений"
    },
    {
      "name": "Игорь Соловьев",
      "department": "Человеческие ресурсы",
      "position": "Специалист по обучению"
    },
    {
      "name": "Юлия Лебедева",
      "department": "Финансы",
      "position": "Финансовый консультант"
    },
    {
      "name": "Владимир Борисов",
      "department": "Маркетинг",
      "position": "PR-специалист"
    },
    {
      "name": "Елена Воробьёва",
      "department": "Человеческие ресурсы",
      "position": "Специалист по компенсациям и льготам"
    },
    {
      "name": "Александр Герасимов",
      "department": "ИТ",
      "position": "Инженер по безопасности"
    },
    {
      "name": "Светлана Чернова",
      "department": "Маркетинг",
      "position": "Менеджер по продукту"
    },
    {
      "name": "Роман Григорьев",
      "department": "Финансы",
      "position": "Риск-менеджер"
    }
  ];

  const [arr, setArr] = useState(initialUsers);

  const departments = [...new Set(arr.map((item) => item.department))];

  const [obj, setObj] = useState({ name: '', department: '' });
  const [editIndex, setEditIndex] = useState(-1);
  const [editObj, setEditObj] = useState({ name: '', department: '' }); 
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');



  const startEdit = (index) => {
    setEditIndex(index);
    const userToEdit = arr[index];
    setEditObj({ ...userToEdit });
  };
   const deleteUser = (index) => {
    const newArr = [...arr];
    newArr.splice(index, 1);
    setArr(newArr);
  };

  const handleEdit = (ev) => {
    ev.preventDefault();
    if (editObj.name && editObj.department) {
      const newArr = [...arr];
      newArr[editIndex] = editObj;
      setArr(newArr);
      setEditIndex(-1);
      setEditObj({ name: '', department: '' });
    }
  };

  const handleInputs = (ev) => {
    setObj({ ...obj, [ev.target.name]: ev.target.value });
  };

  const handleAdding = (ev) => {
    ev.preventDefault();
    if (obj.name && obj.department) {
      setArr([...arr, obj]);
      setObj({ name: '', department: '' });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder='SEARCH'
        onChange={(ev) => setSearch(ev.target.value)}
      />
      <select onChange={(ev) => setSelect(ev.target.value)}>
        <option value="">All Departments</option>
        {departments.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      <form onSubmit={editIndex === -1 ? handleAdding : handleEdit}>
        {editIndex === -1 ? (
          <>
            <input
              name='name'
              type="text"
              value={obj.name}
              placeholder="name"
              onChange={handleInputs}
            />
            <select
              name='department'
              value={obj.department}
              onChange={handleInputs}
            >
              <option value="">Select Department</option>
              {departments.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <button type="submit">ADD</button>
          </>
        ) : (
          <>
            <input
              name='name'
              type="text"
              value={editObj.name}
              placeholder="Name"
              onChange={(ev) => setEditObj({ ...editObj, name: ev.target.value })}
            />
            <select
              name='department'
              value={editObj.department}
              onChange={(ev) => setEditObj({ ...editObj, department: ev.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <button type="submit">SAVE</button>
          </>
        )}
      </form>
      <ul>
        {arr
          .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && (select === '' || item.department === select))
          .map((item, index) => (
            <li key={index}>
              {editIndex === index ? (
                <form onSubmit={handleEdit}>
                  <input
                    name='name'
                    type="text"
                    value={editObj.name}
                    placeholder="Name"
                    onChange={(ev) => setEditObj({ ...editObj, name: ev.target.value })}
                  />
                  <select
                    name='department'
                    value={editObj.department}
                    onChange={(ev) => setEditObj({ ...editObj, department: ev.target.value })}>
                    <option value="">Select Department</option>
                    {departments.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                  <button type="submit">SAVE</button>
                </form>
              ) : (
               <>
                  {item.name}, {item.department}
                  <button onClick={() =>startEdit(index)}>Edit</button>
                  <button onClick={()=> deleteUser(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App
