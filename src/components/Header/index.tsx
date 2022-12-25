import { FiPlusSquare } from "react-icons/fi";

import Logo from "../../assets/logo.svg";
import { Container } from "./styles";

interface Props {
  openModal: () => void;
}

export default function Header({ openModal }: Props) {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" width={300} height={60} />
        <nav>
          <div>
            <button type="button" onClick={openModal}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
}
