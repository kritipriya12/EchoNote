import { useState, useEffect, useCallback } from 'react';
import { apiClient, Letter, CreateLetterData } from './api';

interface UseLettersReturn {
    letters: Letter[];
    isLoading: boolean;
    error: string | null;
    createLetter: (letterData: CreateLetterData) => Promise<Letter | null>;
    updateLetter: (id: string, letterData: Partial<CreateLetterData>) => Promise<Letter | null>;
    deleteLetter: (id: string) => Promise<boolean>;
    refreshLetters: () => Promise<void>;
    clearError: () => void;
}

export const useLetters = (): UseLettersReturn => {
    const [letters, setLetters] = useState<Letter[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const refreshLetters = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await apiClient.getLetters();
            setLetters(response.letters);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load letters';
            setError(errorMessage);
            console.error('Error loading letters:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createLetter = useCallback(async (letterData: CreateLetterData): Promise<Letter | null> => {
        try {
            setError(null);
            const response = await apiClient.createLetter(letterData);
            const newLetter = response.letter;
            
            setLetters(prev => [newLetter, ...prev]);
            
            return newLetter;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create letter';
            setError(errorMessage);
            console.error('Error creating letter:', err);
            return null;
        }
    }, []);

    const updateLetter = useCallback(async (id: string, letterData: Partial<CreateLetterData>): Promise<Letter | null> => {
        try {
            setError(null);
            const response = await apiClient.updateLetter(id, letterData);
            const updatedLetter = response.letter;
            
            setLetters(prev => prev.map(letter => 
                letter.id === id ? updatedLetter : letter
            ));
            
            return updatedLetter;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update letter';
            setError(errorMessage);
            console.error('Error updating letter:', err);
            return null;
        }
    }, []);

    const deleteLetter = useCallback(async (id: string): Promise<boolean> => {
        try {
            setError(null);
            await apiClient.deleteLetter(id);
            
            setLetters(prev => prev.filter(letter => letter.id !== id));
            
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete letter';
            setError(errorMessage);
            console.error('Error deleting letter:', err);
            return false;
        }
    }, []);

    useEffect(() => {
        refreshLetters();
    }, [refreshLetters]);

    return {
        letters,
        isLoading,
        error,
        createLetter,
        updateLetter,
        deleteLetter,
        refreshLetters,
        clearError,
    };
};
