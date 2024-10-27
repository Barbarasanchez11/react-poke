import React, { useState, useEffect } from 'react';
import styles from '../components/Formulario.module.css';

const Formulario = () => {
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            if (search === '') {
                setPokemon(null);
                setError('');
                return;
            }

            setLoading(true);
            setError('');

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);

                if (!response.ok) {
                    throw new Error(' Pokemon no encontrado');
                }

                const data = await response.json();
                setPokemon(data);
            } catch (err) {
                setPokemon(null);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const limpiar = setTimeout(() => {
            fetchPokemon();
        }, 300);

        return () => clearTimeout(limpiar);
    }, [search]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <h1>Buscar Pokémon</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="search">Escribe un nombre de Pokemon</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Escribe un Pokémon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {pokemon && (
                <div className={styles.card}>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>ID: {pokemon.id}</p>
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                </div>
            )}
        </>
    );
};

export default Formulario;
