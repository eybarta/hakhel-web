import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
export default function TopBar() {
  const items = [
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
      // template: (item, options) => (
      //   <Button
      //     link
      //     to='/deceased'
      //     className={`p-menuitem-link ${options.className} ${
      //       location.pathname === '/deceased' ? 'bg-info-400' : ''
      //     }`}
      //   >
      //     <span className={item.icon}></span>
      //     <span>{item.label}</span>
      //   </Button>
      // ),
    },
    {
      label: 'בתי עלמין',
      icon: 'pi pi-building-columns',
      url: '/cemeteries',
      className: location.pathname === '/cemeteries' ? 'active' : '', //location.pathname === '/deceased' ? 'bg-info-800' : ''
      // items: [
      // 		{
      // 				label: 'Components',
      // 				icon: 'pi pi-bolt'
      // 		},
      // 		{
      // 				label: 'Templates',
      // 				icon: 'pi pi-palette',
      // 				items: [
      // 						{
      // 								label: 'Apollo',
      // 								icon: 'pi pi-palette'
      // 						},
      // 						{
      // 								label: 'Ultima',
      // 								icon: 'pi pi-palette'
      // 						}
      // 				]
      // 		}
      // ]
    },
    {
      label: 'אנשי קשר',
      icon: 'pi pi-user',
      url: '/contacts',
      className: location.pathname === '/contacts' ? 'active' : '', //location.pathname === '/deceased' ? 'bg-info-800' : ''
    },
  ];
  const end = (
    <div className='flex items-center gap-2 pl-2'>
      <span className='text-sm text-blue-200 font-bold'>בס״ד</span>
    </div>
  );
  return <Menubar model={items} end={end} />;
}
