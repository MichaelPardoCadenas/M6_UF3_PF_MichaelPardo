PROYECTO FINAL M6 UF3 MICHAEL PARDO

ESTRUCTURA DEL PROYECTO:
1- App: Es el punto de entrada de la aplicación.
2- AppProvider: Crea el contexto global y controla el estado de los usuarios y el tema claro u oscuro.
3- MainApp: Crea la estructura visual del proyecto, aplica las clases light o dark para el tema y organiza la pagina.
4- Sidebar: Muestra la lista de usuarios, permite crear nuevos usuario y tambien cambiar el tema.
5- Main: Es la parte principal donde se muestra el usuario seleccionado.
6- TaskSection: Gestiona la lista de tareas del usuario, tambien permite agregar, editar o eliminar tareas.

USO DEL CONTEXT:
La app usa Context para gestionar el estado global entre todos los componentes sin tener que usar props.
El contexto se crea en AppProvider y lo consume useContext como Sidebar, Main y TaskSection.
