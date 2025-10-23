import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import styles from './App.module.css';

function App() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
	const [isValueValid, setIsValueValid] = useState(false);

  const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError(true);
			setValue('');
			setIsValueValid(false);
		} else {
			setValue(promptValue);
			setError(false);
			setIsValueValid(true);
		};
	}

	const onAddButtonClick = () => {
		const updatedList = [...list, { id: Date.now(), value, createdAt: new Date().toLocaleString().replace(',', '')}]
		if (value !== '') {
			setList(updatedList);
			setValue('');
			setError(false);
			setIsValueValid(false);
		};
	}

	const listing = <ul className={styles.list}>
		{list.map((element) => (
			<li key={element.id} className={styles.listItem}>{element.value}
				<div>{element.createdAt}</div>
			</li>
		))}
	</ul>

	const noListing = <p className={styles.noMarginText}>Нет добавленных элементов</p>

	return (
		<>
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "<output className={styles.currentValue} >{value}</output>"
			</p>
			{error && <div className={styles.error}>Введенное значение должно содержать минимум 3 символа</div>}
			<div className={styles.buttonsContainer}>
				<button onClick={onInputButtonClick} className={styles.button}>Ввести новое</button>
				<button onClick={onAddButtonClick} className={styles.button} disabled={!isValueValid}>Добавить в список</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 ? noListing : listing}
			</div>
		</div>
		</>
  )
}

export default App
