import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IFood } from "../../interfaces/Food";
import api from "../../services/api";
import { Container } from "./styles";
interface Props {
  food: IFood;
  handleDelete: (id: number) => void;
  handleEditFood: (food: IFood) => void;
}

export default function Food({ food, handleDelete, handleEditFood }: Props) {
  const [isAvailable, setIsAvailable] = useState(true);

  async function toggleAvailable(): Promise<void> {
    try {
      await api.put<IFood>(`/foods/${food.id}`, {
        ...food,
        available: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch (err) {
      console.log(err);
    }
  }

  const setEditingFood = (): void => handleEditFood(food);

  return (
    <Container available={isAvailable}>
      <header>
        <LazyLoadImage
          src={food.image}
          alt={food.name}
          width={352}
          height={198}
        />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            aria-label="Editar"
            aria-pressed="false"
            name="edit"
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            aria-label="Deletar"
            aria-pressed="false"
            name="delete"
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              name="available-switch"
              id={`available-switch-${food.id}`}
              aria-label="Interruptor de Disponibilidade"
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
