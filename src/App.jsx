import { useState } from 'react';
import './App.css';

export default function App() {
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');
  const [resultado, setResultado] = useState(null);

  function handleCalcular(e) {
    e.preventDefault();

    const precoAlcool = parseFloat(alcool.replace(',', '.'));
    const precoGasolina = parseFloat(gasolina.replace(',', '.'));

    if (!precoAlcool || !precoGasolina) {
      alert('Por favor, informe valores válidos para ambos os combustíveis.');
      return;
    }

    const calculo = precoAlcool / precoGasolina;

    if (calculo < 0.7) {
      setResultado({
        recomendacao: 'Abasteça com Álcool!',
        razao: (calculo * 100).toFixed(1),
        alcool: precoAlcool.toFixed(2),
        gasolina: precoGasolina.toFixed(2)
      });
    } else {
      setResultado({
        recomendacao: 'Abasteça com Gasolina!',
        razao: (calculo * 100).toFixed(1),
        alcool: precoAlcool.toFixed(2),
        gasolina: precoGasolina.toFixed(2)
      });
    }
  }

  return (
    <div className="container">
      <h1>Qual a melhor opção?</h1>

      <form onSubmit={handleCalcular} className="form">
        <label>Álcool (preço por litro):</label>
        <input
          type="number"
          step="0.01"
          placeholder="Ex: 3.29"
          value={alcool}
          onChange={(e) => setAlcool(e.target.value)}
          required
        />

        <label>Gasolina (preço por litro):</label>
        <input
          type="number"
          step="0.01"
          placeholder="Ex: 4.92"
          value={gasolina}
          onChange={(e) => setGasolina(e.target.value)}
          required
        />

        <button type="submit">Calcular</button>
      </form>

      {resultado && (
        <div className="card-resultado">
          <h2>{resultado.recomendacao}</h2>
          <p>O álcool custa {resultado.razao}% do valor da gasolina.</p>
          <small>Álcool: R$ {resultado.alcool} | Gasolina: R$ {resultado.gasolina}</small>
        </div>
      )}
    </div>
  );
}