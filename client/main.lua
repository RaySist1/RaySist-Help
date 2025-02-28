local display = false

-- Command to toggle the help menu
RegisterCommand('help', function()
    SetDisplay(not display)
end, false)

-- Function to handle the NUI display
function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool
    })
end

-- NUI Callback to close the menu
RegisterNUICallback('close', function(data, cb)
    SetDisplay(false)
    cb('ok')
end)

-- NUI Callback for debug purposes
RegisterNUICallback('debug', function(data, cb)
    TriggerEvent('chat:addMessage', {
        template = '<div style="padding: 0.5vw; background-color: rgba(250, 50, 50, 0.9); border-radius: 5px;"><b>DEBUG:</b> {0}</div>',
        args = { json.encode(data) }
    })
    cb('ok')
end)

-- Hide the help menu when player is dead or the game is paused
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if display then
            if IsPlayerDead(PlayerId()) or IsPauseMenuActive() then
                SetDisplay(false)
            end
        end
    end
end)
