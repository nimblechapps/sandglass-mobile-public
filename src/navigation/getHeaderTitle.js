import { useTranslation } from 'react-i18next';
export default function GetHeaderTitle(route) {
    const routeName = route.name;
    const { t } = useTranslation();
    switch (routeName) {

        default:
            return '';
    }
}