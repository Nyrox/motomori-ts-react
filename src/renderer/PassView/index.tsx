
import * as React from "react"

import { InputPanel } from "./InputPanel"
import { FragmentShaderPanel } from "./FragmentShaderPanel"

enum ActivePanelTab {
    Input,
    FragmentShader
}


interface PanelTabButtonProps { tab: ActivePanelTab; active: boolean; onClick: Function }
const PanelTabButton = ({ tab, active, onClick }: PanelTabButtonProps) => {
    const label = (tab => {
        switch (tab) {
            case ActivePanelTab.Input: return "Input"
            case ActivePanelTab.FragmentShader: return "Fragment Shader"
        }
    })(tab)

    return <button className={active ? "active": ""} onClick={() => onClick()}>{ label }</button>
}


const PanelNavigation = ({activeTab, setActiveTab}) => {
    const buttons = [ActivePanelTab.Input, ActivePanelTab.FragmentShader].map(t => (
        <PanelTabButton key={t} tab={t} active={t == activeTab} onClick={() => setActiveTab(t)} />
    ))

    return <nav className="panel-navigation">
        { buttons }
    </nav>
}


const ChooseMainPanel = (tab: ActivePanelTab) => {
    switch (tab) {
        case ActivePanelTab.Input:
            return <InputPanel />
        case ActivePanelTab.FragmentShader:
            return <FragmentShaderPanel />
    }
}

export const PassDetailView = ({ }) => {
    const [activeTab, setActiveTab] = React.useState(ActivePanelTab.Input)

    

    return <>
        <PanelNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        { ChooseMainPanel(activeTab) }
    </>
}