# ISIS3710-ParcialPractico-202620
# Hugo Lenin Guzman Monsalve - 202415683


Lo arganice siguiendo la estructura. cada | es un separador entre una seccion y otra

  1 - src/app/globals.css bloque @media (prefers-color-scheme: dark) | Revisión manual del código | Contraste mínimo | Cuando el sistema navegador está en modo oscuro, el texto se vuelve claro, pero las tarjetas siguen claros y como consecuencia tenemos texto casi invisible, por ejemplo en los inputs del formulario de registro | Se eliminó el bloque de modo oscuro automático. |


  
  2 - src/app/plans/page.tsx imagen del listado, antes de la línea 15 | AxeDevTools | Contenido no textual | Las imágenes de cada plan no tenían atributo alt, por lo que un lector de pantalla no puede describir la imagen. | Se agregó alt={plan.name} a la imagen en src/components/PlansList.tsx. |
  
  
  
  3 - src/app/auth/register/page.tsx y src/app/auth/login/page.tsx etiquetas <label> | AxeDevTools | Nombre, función y valor | Las etiquetas  no tenían el atributo htmlFor apuntando al id del input | Se agregó htmlFor en cada <label> apuntando al id del input respectivo. |
  
  
  
  4 - src/app/plans/[id]/page.tsx | //// | orden | Un tabIndex positivo fijo saca a ese botón del orden natural de navegación por teclado | Se eliminó el atributo tabIndex={5} |
  
  
  
  5 - src/app/layout.tsx | auditoría  |  Cambio de tamaño del texto | maximumScale: 1 y userScalable: false impedían hacer zoom | Se quitaron esas dos cosas del viewport.
