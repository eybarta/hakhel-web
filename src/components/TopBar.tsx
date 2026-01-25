import { Menubar } from 'primereact/menubar';

export default function TopBar() {
  const items = [
    {
      template: () => {
        return (
          <span className='mr-4 flex'>
            <img className='h-8' src='/src/assets/hakhel-logo-2.svg' alt='' />
          </span>
        );
      },
    },
    {
      label: 'עמוד הבית',
      icon: 'pi pi-home',
      url: '/',
      className: location.pathname === '/' ? 'active' : '', //location.pathname === '/deceased' ? 'bg-info-800' : ''
    },  
    {
      label: 'נפטרים',
      icon: 'pi pi-book',
      url: '/deceased',
      className: location.pathname === '/deceased' ? 'active' : '', //location.pathname === '/deceased' ? 'bg-info-800' : ''
    },
    {
      label: 'בתי עלמין',
      icon: 'pi pi-building-columns',
      url: '/cemeteries',
      className: location.pathname === '/cemeteries' ? 'active' : '', //location.pathname === '/deceased' ? 'bg-info-800' : ''
    },
    {
      label: 'אנשי קשר',
      icon: 'pi pi-user',
      url: '/contacts',
      className: location.pathname === '/contacts' ? 'active' : '', //location.pathname === '/deceased' ? 'bg-info-800' : ''
    },
    {
      label: 'הודעות',
      icon: 'pi pi-envelope',
      url: '/messages',
      className: location.pathname === '/messages' ? 'active' : '',
    },
  ];


  return <Menubar model={items} />;
}
