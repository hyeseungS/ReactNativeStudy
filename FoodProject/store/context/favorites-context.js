import { createContext, useState } from 'react';

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {}, // 실제 함수가 아닌 더미 정의 (실제 구현부는 나중에 작성)
    removeFavorite: (id) => {}
});

// Context 관리 -> 이 컴포넌트가 나중에 앱으로 또는 다른 컴포넌트로 둘러쌓여 이 Context와 상호작용 가능
function FavoritesContextProvider({children}) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorite(id) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }

    function removeFavorite(id) {
        setFavoriteMealIds((currentFavIds) => currentFavIds.filter(mealId => mealId !== id)) // 일치하면 false로 아이템 버려짐
    }

    // favoriteMEalIds 배열과 위 함수들을 Context 제공자에게 전달해야함 (왼쪽 함수는 다른 컴포넌트 내부에서 실행 가능한 함수 & 오른쪽은 위 함수)
    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    };
    
    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;
