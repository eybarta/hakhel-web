import { useMemo } from 'react';
import { Button } from 'primereact/button';
import { ColumnBodyOptions } from 'primereact/column';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const useExpanderColumn = <
  T extends { id: number | string; address?: string }
>() => {
  const { t } = useTranslation();
  return useMemo(
    () => ({
      expander: true,
      style: { width: '3em' },
      disabled: true,
      iconClassName: 'pi pi-search',
      body: (data: T, options: ColumnBodyOptions): ReactNode => {
        const {
          expander,
          props: { expandedRows },
        } = options;
        const { id, address } = data;

        const isExpanded =
          expandedRows?.some((row: T) => row.id === id) || false;

        const baseClass = 'pi pi-chevron-left';
        const className = isExpanded
          ? `${baseClass} pi-chevron-down`
          : baseClass;

        const handleClick = (e: React.MouseEvent<HTMLElement>) => {
          if (expander?.onClick) {
            expander.onClick(e);
          }
        };

        const tooltip = !address ? t('No address') : '';

        return (
          <Button
            icon={className}
            rounded
            text
            severity='secondary'
            aria-label='Toggle'
            tooltip={tooltip}
            className={!address ? 'opacity-20' : ''}
            tooltipOptions={{ position: 'bottom', mouseTrack: true }}
            onClick={address ? handleClick : undefined}
          />
        );
      },
    }),
    []
  );
};

export default useExpanderColumn;
