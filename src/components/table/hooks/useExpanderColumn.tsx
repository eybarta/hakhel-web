import { useMemo } from 'react';
import { Button } from 'primereact/button';
import { ColumnBodyOptions } from 'primereact/column';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type DataType = {
  id: number | string;
  [key: string]: any;
};

const useExpanderColumn = <T extends DataType>(
  expanderProp: keyof T,
  disableEmpty: boolean = false
) => {
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
        const { id } = data;
        const prop = data[expanderProp];

        const isExpanded =
          expandedRows?.some((row: T) => row.id === id) || false;

        const baseClass = 'pi pi-chevron-left';
        const iconClass = isExpanded
          ? `${baseClass} pi-chevron-down`
          : baseClass;

        const handleClick = (e: React.MouseEvent<HTMLElement>) => {
          if (expander?.onClick) {
            expander.onClick(e);
          }
        };

        const blockExpand = !prop.length && disableEmpty;
        const tooltip = blockExpand ? t(`No ${String(expanderProp)}`) : '';
        const className = blockExpand ? 'opacity-20' : '';

        return (
          <Button
            icon={iconClass}
            rounded
            text
            severity='secondary'
            aria-label='Toggle'
            tooltip={tooltip}
            className={className}
            tooltipOptions={{ position: 'bottom', mouseTrack: true }}
            onClick={!blockExpand ? handleClick : undefined}
          />
        );
      },
    }),
    []
  );
};

export default useExpanderColumn;
