export const Footer = ({ locale }: { locale: string }) => {

  return (
    <footer className="px-4 py-6 text-center">
      <ul>
        <li className="mr-2 inline-block">
          <a target="_blank" href="https://jm3development.vercel.app">
            jm3 &copy; 2023 |
          </a>
        </li>
        <li className="mr-2 inline-block">
          <a href="">Contactanos |</a>
        </li>
        <li className="mr-2 inline-block">
          <a href="">Aviso legal y Politica de Privacidad |</a>
        </li>
        <li className="mr-2 inline-block">
          <a href="">Contactanos |</a>
        </li>

        <li className="mr-2 inline-block">
          <a href="">Copyright |</a>
        </li>
        <li className="mr-2 inline-block">
          <a href="">Politica de cookies |</a>
        </li>
        <li className="mr-2 inline-block">
          <a href="">Condiciones donaciones web |</a>
        </li>
        <li className="mr-1 inline-block">
          <a href="">Condiciones uso web |</a>
        </li>

        <li className="mr-1 inline-block">
          <a href="">Contactanos </a>
        </li>
      </ul>
    </footer>
  );
};
