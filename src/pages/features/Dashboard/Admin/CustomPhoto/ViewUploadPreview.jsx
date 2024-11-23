/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PopupState, { bindPopover, bindHover } from 'material-ui-popup-state';
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { FaTrash } from 'react-icons/fa';

function ViewUploadPreview({ previews, setPreviews }) {

    return (
        <div className={`grid gap-2 h-full place-items-center ${previews.length === 1
            ? 'grid-cols-1'
            : previews.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-3'
            }`}>
            {previews && previews.length > 0 && (
                <Fragment>
                    {previews.map((preview, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                        <Button variant="contained" {...bindHover(popupState)} sx={{ background: 'transparent', p: 2, cursor: 'default' }}>
                                            <img src={preview.blobUrl} alt="preview" className="min-w-56" />
                                        </Button>
                                        <HoverPopover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <Typography sx={{ p: 2 }}>
                                                <button
                                                    className="flex gap-1 items-center border border-solid border-red-600 bg-slate-50 rounded-xl transition-all px-3 py-2 text-red-500 hover:border-current hover:bg-red-500 hover:text-slate-50"
                                                    onClick={() => {
                                                        const updated = previews.filter((_, idx) => idx !== i)
                                                        setPreviews(updated)
                                                    }}
                                                >
                                                    Delete
                                                    <FaTrash />
                                                </button>
                                            </Typography>
                                        </HoverPopover>
                                    </div>
                                )}
                            </PopupState>
                        </div>
                    ))}
                </Fragment>
            )}
        </div>
    );
}

export default ViewUploadPreview;
