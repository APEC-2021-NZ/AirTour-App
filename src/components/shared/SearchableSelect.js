import {
    IonCol,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonModal,
    IonText,
    IonRow,
    IonChip,
    IonLabel,
    IonNote,
} from '@ionic/react'
import { chevronBackOutline, checkmark } from 'ionicons/icons'
import { matchSorter } from 'match-sorter'
import React, { useState } from 'react'

/**
 * Haphazardly thrown together searchable select
 *
 * options must have an 'id' property
 */
const SearchableSelect = ({
    value,
    onChange,
    multiple,
    placeholder,
    options,
    searchKeys,
    getOptionName,
}) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSelect = (item) => {
        if (multiple) {
            const ids = value.map((elem) => elem.id)
            if (ids.includes(item.id)) {
                onChange(value.filter((elem) => elem.id !== item.id))
            } else {
                onChange([...value, item])
            }
        } else {
            onChange(item)
            setOpen(false)
        }
    }

    const isSelected = (item) => {
        if (!value) {
            return false
        }
        if (multiple) {
            const ids = value.map((elem) => elem.id)
            return ids.includes(item.id)
        }
        return value.id === item.id
    }

    const handleClose = () => {
        setSearch('')
        setOpen(false)
    }

    const matches = matchSorter(options, search, { keys: searchKeys })

    // display placeholder if values length is 0
    let displayValue = null
    if (multiple && value.length > 0) {
        displayValue = value.map(getOptionName).join(', ')
    } else if (value && !multiple) {
        displayValue = getOptionName(value)
    }

    return (
        <>
            <IonItem
                button
                onClick={() => setOpen(true)}
                style={{
                    border: '1px solid #979797',
                    borderRadius: '10px',
                    padding: '5px',
                    margin: '5px',
                }}
                lines="none"
                position="stacked"
            >
                <IonLabel position="stacked">{placeholder}</IonLabel>
                <IonInput readonly value={displayValue} />
            </IonItem>
            <IonModal isOpen={open} onDidDismiss={handleClose}>
                <IonGrid
                    style={{
                        marginTop: 25,
                        width: '100%',
                    }}
                >
                    <IonIcon
                        onClick={handleClose}
                        icon={chevronBackOutline}
                        style={{
                            position: 'fixed',
                            width: 32,
                            height: 32,
                            top: 30,
                            left: 15,
                        }}
                    />
                    <IonInput
                        value={search}
                        placeholder="Search"
                        style={{
                            fontSize: 14,
                            minWidth: 100,
                            margin: '0px 20px 0px 35px',
                            width: 'calc(100% - 70px)',
                            overflow: 'show',
                            textAlign: 'center',
                        }}
                        onIonChange={(e) => setSearch(e.target.value)}
                    />
                    <hr
                        style={{
                            borderTop: '1px solid #C2C2C2',
                            marginRight: 20,
                            marginLeft: 20,
                        }}
                    />

                    {matches.map((item, index) => (
                        <IonCol
                            key={item.id}
                            onClick={() => handleSelect(item)}
                        >
                            <IonRow
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {isSelected(item) && (
                                    <IonIcon
                                        icon={checkmark}
                                        style={{
                                            position: 'fixed',
                                            color: 'green',
                                            width: 24,
                                            height: 24,
                                            left: '35px',
                                        }}
                                    />
                                )}

                                <p
                                    key={item.id}
                                    style={{
                                        fontWeight: 300,
                                        fontSize: 18,
                                        textAlign: 'center',
                                        maxWidth: 'calc(100% - 120px)',
                                    }}
                                >
                                    {getOptionName(item)}
                                </p>
                            </IonRow>
                            {index !== matches.length - 1 ? (
                                <hr
                                    key={item.name}
                                    style={{
                                        borderTop: '1px solid #C2C2C2',
                                        marginRight: 40,
                                        marginLeft: 40,
                                    }}
                                />
                            ) : null}
                        </IonCol>
                    ))}

                    {!matches.length && (
                        <p
                            style={{
                                fontWeight: 300,
                                fontSize: 18,
                                textAlign: 'center',
                            }}
                        >
                            No results
                        </p>
                    )}
                </IonGrid>
            </IonModal>
        </>
    )
}

export default SearchableSelect
